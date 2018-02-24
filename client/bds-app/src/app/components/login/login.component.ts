import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;

  constructor(private router: Router, private loginSrv: LoginService){}

  ngOnInit() {
  }

  login(loginForm) {
    if (this.valideForm(loginForm)) {
      this.errorMessage = null;

      this.loginSrv.login(loginForm.login, loginForm.password, () => {
        this.router.navigate(['/orders']);

      }, (error) => {
        this.errorMessage = "Identifiants incorrects";
        console.log(error);
      });
    }
  }

  private valideForm(loginForm) {

    if (loginForm.login == "") {
      this.errorMessage = "Veuillez saisir un login";
      return false;

    } else if (loginForm.password == "") {
      this.errorMessage = "Veuillez saisir un mot de passe";
      return false;
    }

    return true;
  }

}
