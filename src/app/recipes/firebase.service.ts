import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  items;
  constructor(private db: AngularFireDatabase) {
    this.items = this.db.list('/events');
 }
}
