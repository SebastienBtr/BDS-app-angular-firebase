import { Component } from '@angular/core';
import {Router} from "@angular/router";

import { OrdersService } from './services/orders.service';
import {AllosService} from "./services/allos.service";
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ OrdersService, AllosService, LoginService]
})
export class AppComponent {

  connected;

  constructor(private router: Router, private loginSrv: LoginService){}

  ngOnInit() {
    this.isLog();
  }

  logout() {
    this.loginSrv.logout();
  }

  private isLog() {
    this.loginSrv.isLog().subscribe((user) => {
      if (user) {
        this.connected = true;
        this.router.navigate(['/orders']);

      } else {
       this.connected = false;
      }
    });
  }
}
