import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrdersService {

  constructor(private db: AngularFireDatabase) {
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


}
