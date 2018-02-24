import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";
import * as firebase from 'firebase/app';
import {Router} from "@angular/router";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class LoginService {

  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router){
    this.user = firebaseAuth.authState;
  }

  login(login, password, success, error) {

    this.firebaseAuth.auth.signInWithEmailAndPassword(login, password)
      .then(value => {

        this.db.list('Users/', ref => ref.orderByChild('email').equalTo(login))
          .valueChanges().subscribe((user) => {

          if (user[0] != null && user[0].isAdmin) {
            success()

          } else {
            error({message: "not an admin user"});
            this.firebaseAuth.auth.signOut();
          }
        });

      })
      .catch(err => {
        error(err.message);
      });
  }

  logout() {
    this.firebaseAuth.auth.signOut().then((res) => {
      this.router.navigate(['/'])
    });
  }

  isLog() {
    return this.user;
  }
}
