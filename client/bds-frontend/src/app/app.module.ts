import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { OrderComponent } from './order/order.component';
import { MembersComponent } from './members/members.component';
import { PartnersComponent } from './partners/partners.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'allo', component: OrderComponent },
  { path: 'members', component: MembersComponent },
  { path: 'partners', component: PartnersComponent },
  { path: '', component: HomeComponent},
  { path: '**', component: HomeComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    MembersComponent,
    PartnersComponent,
    HomeComponent
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
