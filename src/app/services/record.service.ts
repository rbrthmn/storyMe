import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import RecordInterface from '../interfaces/record.interface';
import uuid from 'uuid/v4';
import {UserService} from './user.service';
import {User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private static readonly DB_COLLECTION_KEY = 'record';

  /** Keep a synchronous reference to the firebase user. */
  private user: User | null = null;

  private itemBehaviorSubject = new BehaviorSubject<RecordInterface[]>([]);

  /**
   * Get an observable of the items in the database.
   * This observable changes whenever an entry on the database changes.
   */
  public get items(): Observable<RecordInterface[]> {
    return this.itemBehaviorSubject.asObservable();
  }

  private dbCollection: AngularFirestoreCollection<RecordInterface>;
  private dbCollectionSubscription = new Subscription();

  constructor(private db: AngularFirestore, private userService: UserService) {

    this.userService.user.subscribe(
      userRef => {
        if (userRef !== null) {
          this.dbCollectionSubscription.unsubscribe();
          const {uid} = userRef;
          this.dbCollection = db.collection<RecordInterface>(
            RecordService.DB_COLLECTION_KEY,
            ref => ref.where('userId', '==', uid)
          );
          this.user = userRef;
          this.dbCollectionSubscription.add(
            this.dbCollection.valueChanges().subscribe(
              value => this.itemBehaviorSubject.next(value)
            )
          );
        }
      }
    );

  }

  /**
   * Adds a new record to the database.
   * Upon receiving the new object to be added to the database, generates a new
   * id for the object using UUID v4.
   * @param record The record to be added. Notice that this specific piece of record does not
   * contain the 'id', since it's a new entry.
   * @returns the document reference of the new record added.
   */
  public async addRecord(record: Omit<RecordInterface, 'id' | 'userId'>): Promise<DocumentReference> {
    const r: RecordInterface = {
      ...record, id: uuid(), userId: this.user.uid
    };
    return await this.dbCollection.add(r);
  }

  /**
   * Gets a single record in the database.
   * @param id The id of the record
   * @returns the instance of the `RecordInterface`, or `null` if the query doesn't have a
   * document.
   */
  public async getSingleRecord(id: string): Promise<RecordInterface | null> {
    const col = this.db.collection<RecordInterface>(
      RecordService.DB_COLLECTION_KEY,
      ref => ref
        .where('userId', '==', this.user.uid)
        .where('id', '==', id)
    );
    const items = (await col.get().toPromise());
    if (items.empty) {
      return null;
    }

    // The IDs are Unique UUIDs, so this query should return only one document.
    // With that in mind, return just the document at the first index of the array.
    return items.docs[0].data() as RecordInterface;
  }

  /**
   * Removes a specific document from the database.
   * @param id the document ID to be removed.
   * @returns `true` if the document was successfully removed, or `false` in case the document
   * didn't exist in the first place, or it wasn't able to remove it.
   */
  public async removeRecord(id: string): Promise<boolean> {
    const col = this.db.collection<RecordInterface>(
      RecordService.DB_COLLECTION_KEY,
      ref => ref
        .where('userId', '==', this.user.uid)
        .where('id', '==', id)
    );
    const items = (await col.get().toPromise());

    if (items.empty) {
      return false;
    }
    // The IDs are Unique UUIDs, so this query should return only one document.
    // With that in mind, delete just the document at the first index of the array.
    await items.docs[0].ref.delete();
    return true;
  }

  /**
   * Searches a document or range of documents by date.
   * @param date the date parameter.
   * @returns an array containing the documents found by the provided date.
   *
   * Usage:
   * ```
   * const date = new Date(2019, 11, 22);
   * const data = await service.searchByDate(date); // Array<RecordInterface>
   * ```
   */
  public async searchByDate(date: Date): Promise<RecordInterface[]> {
    const dateLess = new Date(date);
    const dateMore = new Date(date);
    dateLess.setDate(date.getDate() - 1);
    dateMore.setDate(date.getDate() + 1);
    const col = this.db.collection<RecordInterface>(
      RecordService.DB_COLLECTION_KEY,
      ref => ref
        .where('userId', '==', this.user.uid)
        .where('createdAt', '>', dateLess)
        .where('createdAt', '<', dateMore)
    );
    const items = (await col.get().toPromise());
    if (items.empty) {
      return [];
    }
    const returnItems: RecordInterface[] = [];

    items.docs.forEach(doc => returnItems.push(doc.data() as RecordInterface));

    return returnItems;
  }
}
