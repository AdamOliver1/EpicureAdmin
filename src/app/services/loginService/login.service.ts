import { BehaviorSubject, Observable, Subject, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { getCookie, setCookie, removeCookie } from "typescript-cookie";
import { RoleService } from "../roleService/role.service";
import { environment } from "environment/environment";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private url = environment.apiKey;
  private _isLoggedIn$ = new BehaviorSubject<Boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private roleService: RoleService
  ) {
    this._isLoggedIn$.next(!!getCookie("token")); 
  } //TODO token service that handles all the verification (maybe not exclusive to tokens)

   login(username: string, password: string): Observable<Object> {
    return this.httpClient
      .post(`${this.url}/auth`, {
        username,
        password,
      })
      .pipe(
        tap((res: any) => {
          this._isLoggedIn$.next(true);
          this.roleService.setRole(res.user.role);
          setCookie("login", res.user.name);
          setCookie("token", res.token);
          setCookie("role", res.user.role); //TODO role
        })
      );
  }

  checkedLogin(): boolean {
    return getCookie("login") !== undefined;
  }

  logout() {
    this._isLoggedIn$.next(false);
    removeCookie("login");
    removeCookie("token");
  }

  getUsername() {
    return getCookie("login");
  }
}
