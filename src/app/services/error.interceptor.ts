import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { NotificationService } from "./notificationService/notification.service";

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error?.errors) {//TODO handle multiple errors joi
          error.error?.errors.forEach((er: any) => {
            this.notificationService.showError(er.message);
          });
        } else {
          this.notificationService.showError(error.error.message);
        }
        return throwError(() => error);
      })
    );
  }
}
