import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { getCookie, setCookie,removeCookie } from "typescript-cookie";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  url = "http://localhost:8000/api/v1";
  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string): Observable<Object> {
    return this.httpClient.post(`${this.url}/auth`, {
      username,
      password,
    });
  }

  checkedLogin(): boolean {
    return getCookie("login") !== undefined;
  }

  logout(){
    removeCookie('login');
  }
}
