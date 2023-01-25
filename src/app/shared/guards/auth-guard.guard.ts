import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LoginService } from "src/app/services/loginService/login.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate() {//TODO if logged in send to home page 
    if (this.loginService.checkedLogin()) {
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }
}
