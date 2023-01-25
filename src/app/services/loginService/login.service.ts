import { BehaviorSubject, Observable, Subject, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { getCookie, setCookie,removeCookie } from "typescript-cookie";
import { AdminService } from "../adminService/admin.service";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  url = "http://localhost:8000/api/v1";
 private _isLoggedIn$ = new BehaviorSubject<Boolean>(false);
 isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private httpClient: HttpClient,
    private adminService:AdminService) {
    const token = getCookie('token');
    this._isLoggedIn$.next(!!token);//TODO check expiration date
  }//TODO token service that handles all the verification (maybe not exclusive to tokens)

  login(username: string, password: string): Observable<Object> {
    return this.httpClient.post(`${this.url}/auth`, {
      username,
      password,
    }).pipe(
      tap((res:any) => {
        this._isLoggedIn$.next(true);
        console.log(" this._isLoggedIn$.next(true);");
        this.adminService.setAdmin(res.user.admin);
        setCookie("login", res.user.name);
        setCookie("token", res.token);
        setCookie("admin", res.user.admin);//TODO role
      })
    );
  }

  checkedLogin(): boolean {
    return getCookie("login") !== undefined;
  }

  logout(){
    this._isLoggedIn$.next(false);
    removeCookie('login');
    removeCookie('token');
  }

  getUsername(){
    return getCookie('login');
  }
}
