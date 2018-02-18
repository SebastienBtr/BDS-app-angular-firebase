import {Component, OnInit, OnDestroy} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/timer';

import { OrdersService } from '../../services/orders.service';
import {AllosService} from "../../services/allos.service";
import {Observable} from "rxjs/Observable";
import * as _ from 'lodash';
import {AnonymousSubscription} from "rxjs/Subscription";


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any[];
  allos: Observable<any[]>;
  allSelected = true;
  currentAlloName: string;

  private filterSubscription: AnonymousSubscription;
  private allSubscription: AnonymousSubscription;

  constructor(private ordersService: OrdersService, private allosService: AllosService) {
  }

  public ngOnInit(): void {

    this.allos = this.allosService.getActiveAllos();
    this.currentAlloName = "Toutes";
    this.refreshData(this.currentAlloName);
  }

  public ngOnDestroy(): void {

    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }

    if (this.allSubscription) {
      this.allSubscription.unsubscribe();
    }
  }

  private refreshData(alloName): void {

    if (!this.allSelected) {
      this.filterSubscription = this.ordersService.getOrdersNotFinishForAlloId(alloName).subscribe((data) => {
        let filters = {};
        filters['isDelivered'] = val => val == false;
        this.orders = _.filter(data, _.conforms(filters) )
      });

    } else {
      this.allSubscription = this.ordersService.getOrdersNotFinish().subscribe((data) => {
        this.orders = data
      });
    }

  }

  removeOrder(id) {

    this.ordersService.postRemoveOrder(id)
  }

  updateOrder(id,state) {
    state = !state;
    this.ordersService.postUpdateOrder(id,state)
  }

  allOrders() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
    this.allSelected = true;
    this.currentAlloName = "Toutes";
    this.refreshData(this.currentAlloName);
  }

  alloChange(name) {
    if (this.allSubscription) {
      this.allSubscription.unsubscribe();
    }
    this.allSelected = false;
    this.currentAlloName = name;
    this.refreshData(this.currentAlloName);
  }

}
