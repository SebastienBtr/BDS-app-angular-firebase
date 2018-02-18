import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AllosService {

  constructor(private db: AngularFireDatabase) {
  }

  getAllAllos(): Observable<any[]> {
    return this.db.list('Allos/').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))
    });
  }

  getActiveAllos(): Observable<any[]> {

    return this.db.list('Allos/', ref => ref.orderByChild('isActive').equalTo(true))
      .snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))
    });
  }

  getAlloForId(id): Observable<{}> {
    return this.db.object('Allos/' + id).valueChanges()
  }

  postUpdateAllo(id, state) {
    return this.db.object('Allos/' + id).update({ isActive: state})
  }
}
