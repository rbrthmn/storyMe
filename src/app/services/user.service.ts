import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from "rxjs";
import User from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class RecordService {

    constructor(public afAuth: AngularFireAuth) { }

    public async googleLogin(): Promise<any> {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        
        return await this.afAuth.auth.signInWithPopup(provider);
        // WIP: https://angular-templates.io/tutorials/about/firebase-authentication-with-angular
    }

}
