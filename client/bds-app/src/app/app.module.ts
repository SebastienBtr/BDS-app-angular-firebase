import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from "@angular/common/http";

import { ApiService } from "./services/api.service";

import { AppComponent } from './app.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AllosComponent } from './components/allos/allos.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddOrderComponent } from './components/add-order/add-order.component';




const appRoutes: Routes = [
  { path: 'orders', component: OrdersComponent },
  { path: 'add-order', component: AddOrderComponent },
  { path: 'allos',  component: AllosComponent },
  { path: '',
    redirectTo: '/orders',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    AllosComponent,
    PageNotFoundComponent,
    AddOrderComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
