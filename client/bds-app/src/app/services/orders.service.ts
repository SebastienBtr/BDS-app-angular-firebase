import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrdersService {

  constructor(private db: AngularFireDatabase) {
  }

  getAllOrders(): Observable<any[]> {
    return this.db.list('Orders/').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))
    });
  }

  getOrdersNotFinish(): Observable<any[]> {
    return this.db.list('Orders/', ref => ref.orderByChild('isDelivered').equalTo(false))
      .snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))
      });
  }

  getOrdersNotFinishForAlloId(alloName): Observable<any[]> {
    return this.db.list('Orders/', ref => ref.orderByChild('name').equalTo(alloName))
      .snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))
      });
  }

  postRemoveOrder(id) {
    return this.db.object('Orders/' + id).update({ isDelivered: true})
  }

  postOrder(order, alloName): Observable<{}> {

    let quantity: number;

    if (!order.quantity) {
      quantity = 1;

    } else {
      quantity = order.quantity;
    }

    let newOrder = {
      comment: order.comment,
      date: Date.now(),
      isDelivered: false,
      isInProgress: false,
      name: alloName,
      owner: order.owner,
      quantity: quantity
    };

    let adKey = this.db.list('Orders/').push(newOrder).key;

    return this.db.object('Orders/' + adKey).valueChanges();
  }

  postUpdateOrder(id,state) {
    return this.db.object('Orders/' + id).update({ isInProgress: state})
  }
}
