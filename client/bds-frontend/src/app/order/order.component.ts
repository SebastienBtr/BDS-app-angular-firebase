import { Component, OnInit } from '@angular/core';
import {AllosService} from "../services/allos.service";
import {AnonymousSubscription} from "rxjs/Subscription";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/timer';
import {Observable} from "rxjs/Observable";
import {OrdersService} from "../services/orders.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  allos: Observable<any[]>;
  currentAllo;
  errorMessage: string;
  successMessage: string;

  private alloSubscription: AnonymousSubscription;
  private postOrderSubscription: AnonymousSubscription;

  constructor(private allosService: AllosService, private ordersService: OrdersService) {}

  ngOnInit() {

    this.allos = this.allosService.getActiveAllos();
  }

  public ngOnDestroy(): void {

    if (this.alloSubscription) {
      this.alloSubscription.unsubscribe();
    }

    if (this.postOrderSubscription) {
      this.postOrderSubscription.unsubscribe();
    }
  }

  chooseAllo(id) {

    this.errorMessage = null;
    this.successMessage = null;

    this.alloSubscription = this.allosService.getAlloForId(id).subscribe((data) => {
      this.currentAllo = data;
    });
  }

  register(order) {

    if (this.valideForm(order)) {
      this.postOrderSubscription = this.ordersService.postOrder(order,this.currentAllo.name)
        .subscribe( () => {

          if (this.alloSubscription) {
            this.alloSubscription.unsubscribe();
          }

          this.currentAllo = null;
          this.errorMessage = null;
          this.successMessage = "Votre commande a été envoyé avec succès"
        });
    }
  }

  backToSelection() {
    this.currentAllo = null;

    if (this.alloSubscription) {
      this.alloSubscription.unsubscribe();
    }
  }

  private valideForm(order) {

    if (this.currentAllo.isCountable) {

      if (order.quantity == "") {
        this.errorMessage = "Veuillez saisir une quantité";
        return false;

      } else if (isNaN(order.quantity)) {
        this.errorMessage = "La quantité doit être un nombre";
        return false;

      } else if (order.quantity.toString().length > 2) {
        this.errorMessage = "La quantité est trop grande";
        return false;
      }
    }

    if (order.owner == "") {
      this.errorMessage = "Veuillez saisir un nom";
      return false;

    } else  if (order.owner.toString().length > 30) {
      this.errorMessage = "Le nom saisi est trop long";
      return false;

    } else if (order.comment == "") {
      this.errorMessage = "Veuillez saisir un commentaire";
      return false;

    } else if (order.comment.toString().length > 130) {
      this.errorMessage = "Le commentaire saisie est trop long";
      return false;
    }

    return  true;
  }

}
