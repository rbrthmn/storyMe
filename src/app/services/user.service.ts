import {Injectable} from '@angular/core';
import {AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import UserCredential = firebase.auth.UserCredential;
import { User } from 'firebase';
import { Observable } from 'rxjs';
import UserInterface from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static readonly DB_COLLECTION_KEY = 'users';
  /**
   * Get an observable of the logged in user. Can also be used as a promise.
   * Usage as a promise:
   * ```
   *  const user = await userService.user.toPromise();
   * ```
   */
  public user: Observable<User | null>;

  private dbCollection: AngularFirestoreCollection<UserInterface>;

  constructor(public fireAuth: AngularFireAuth, private db: AngularFirestore) {
    this.user = fireAuth.user;
    this.dbCollection = db.collection<UserInterface>(UserService.DB_COLLECTION_KEY);
  }

  /**
   * Logs an user in using the Google Authentication method.
   * If the user hasn't been registered yet to the database, creates a new register of the
   * user, with it's ID.
   */
  public async googleSignIn(): Promise<UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    const userCredentials = await this.fireAuth.auth.signInWithPopup(provider);
    const { uid } = userCredentials.user;

    const dbColRef = this.db.collection<UserInterface>(UserService.DB_COLLECTION_KEY,
      ref => ref.where('id', '==', uid)
    );

    const userDocs = await dbColRef.get().toPromise();

    // User wasn't registered in the database
    if (userDocs.empty) {
      const userData: UserInterface = {
        name: userCredentials.user.displayName,
        email: userCredentials.user.email,
        id: userCredentials.user.uid
      };
      await this.dbCollection.add(userData);
    }

    return userCredentials;
  }

  /**
   * Logs the current user out, if there is a current user.
   */
  public async signOut(): Promise<void> {
    const currentUser = await this.fireAuth.user.toPromise();
    if (currentUser != null) {
      await this.fireAuth.auth.signOut();
    }
  }

}
