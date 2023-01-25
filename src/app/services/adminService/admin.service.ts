import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Admin } from "src/app/models/Admin";
import { getCookie } from "typescript-cookie";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  private _admin$ = new BehaviorSubject<string>(Admin.NON.toString());
  admin$ = this._admin$.asObservable();

  constructor() {
    const admin = getCookie('admin');
    this._admin$.next(admin ?? Admin.UPDATER)
  }

  

  setAdmin(admin:Admin){
    this._admin$.next(admin);
  }
}
