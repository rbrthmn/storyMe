import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import RecordInterface from "../interfaces/record.interface";
import uuid from 'uuid/v4';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private static readonly DB_COLLECTION_KEY = 'record';
  /**
   * Get an observable of the items in the database.
   * This observable changes whenever an entry on the database changes.
   */
  public get items(): Observable<RecordInterface[]> {
    return this.dbCollection.valueChanges();
  }

  private dbCollection: AngularFirestoreCollection<RecordInterface>;

  constructor(private db: AngularFirestore) {
    this.dbCollection = db.collection<RecordInterface>(RecordService.DB_COLLECTION_KEY);
  }

  /**
   * Adds a new record to the database.
   * Upon receiving the new object to be added to the database, generates a new
   * id for the object using UUID v4.
   * @param record The record to be added. Notice that this specific piece of record does not
   * contain the 'id', since it's a new entry.
   * @returns the document reference of the new record added.
   */
  public async addRecord(record: Omit<RecordInterface, 'id'>): Promise<DocumentReference> {
    const r: RecordInterface = {
      ...record, id: uuid()
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
        ref => ref.where('id', '==',id)
    );
    const items = (await col.get().toPromise());
    if (items.empty) {
      return null;
    }

    // The IDs are Unique UUIDs, so this query should return only one document.
    // With that in mind, return just the document at the first index of the array.
    return items[0];
  }

  /**
   * Removes a specific document from the database.
   * @param id the document ID to be removed.
   * @returns `true` if the document was successfully removed, or `false` in case the document
   * didn't exist in the first place, or it wasn't able to remove it.
   */
  public async removeRecord(id: string): Promise<boolean> {
    const items = await this.dbCollection.ref.where('id', '==', id).get();
    if (items.empty) {
      return false;
    }
    // The IDs are Unique UUIDs, so this query should return only one document.
    // With that in mind, delete just the document at the first index of the array.
    await items.docs[0].ref.delete();
    return true;
  }
}
