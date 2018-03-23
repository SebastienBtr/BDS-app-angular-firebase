import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AllosComponent } from './components/allos/allos.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { LoginComponent } from './components/login/login.component';




const appRoutes: Routes = [
  { path: 'orders', component: OrdersComponent },
  { path: 'add-order', component: AddOrderComponent },
  { path: 'allos',  component: AllosComponent },
  { path: '', component: AppComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    AllosComponent,
    PageNotFoundComponent,
    AddOrderComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    RouterModule.forRoot(appRoutes, { useHash: true }),  // .../#/crisis-center/
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
