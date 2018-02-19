import { Component, OnInit } from '@angular/core';
import {AllosService} from "../../services/allos.service";
import {OrdersService} from "../../services/orders.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AnonymousSubscription} from "rxjs/Subscription";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  allos: Observable<any[]>;
  currentAllo;
  errorMessage: String;

  private alloSubscription: AnonymousSubscription;
  private postOrderSubscription: AnonymousSubscription;

  constructor(private ordersService: OrdersService, private allosService: AllosService, private router: Router) {
  }

  ngOnInit() {
    this.allos = this.allosService.getActiveAllos();

    this.alloSubscription = this.allosService.getActiveAllos().subscribe((data) => {
      this.currentAllo = data[0];
    });
  }

  public ngOnDestroy(): void {

    if (this.alloSubscription) {
      this.alloSubscription.unsubscribe();
    }

    if (this.postOrderSubscription) {
      this.postOrderSubscription.unsubscribe();
    }
  }

  register(order) {

    if (this.valideForm(order)) {
      this.postOrderSubscription = this.ordersService.postOrder(order,this.currentAllo.name)
        .subscribe( () => {

        this.router.navigate(['/orders']);
      });

    }
  }

  private valideForm(order) {

    if (this.currentAllo.isCountable) {

      if (order.quantity == "") {
        this.errorMessage = "quantity is require";
        return false;

      }else if (isNaN(order.quantity)) {
        this.errorMessage = "quantity must be a number";
        return false;

      } else if (order.quantity.toString().length > 2) {
        this.errorMessage = "quantity too much";
        return false;
      }

    }

    if (order.owner == "") {
      this.errorMessage = "name is require";
      return false;

    } else  if (order.owner.toString().length > 30) {
      this.errorMessage = "name too long";
      return false;

    } else if (order.comment == "") {
      this.errorMessage = "comment is require";
      return false;

    } else if (order.comment.toString().length > 130) {
      this.errorMessage = "comment too long";
      return false;
    }

    return  true;
  }

  alloChange(id) {

    this.alloSubscription = this.allosService.getAlloForId(id).subscribe((data) => {
      this.currentAllo = data;
    });

  }

}
