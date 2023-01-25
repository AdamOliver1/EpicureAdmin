import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { getCookie, removeCookie } from "typescript-cookie";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = getCookie("token");
    
    if (!!token) {
        console.log(token);
      const clonedReq = req.clone({
        // withCredentials:true,
        setHeaders:{Authorization: `Bearer ${token}`} 
      });
      return next.handle(clonedReq);
    } else {
      return next.handle(req);
    }
  }
}
