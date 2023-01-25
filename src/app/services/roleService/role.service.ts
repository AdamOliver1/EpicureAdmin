import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Role } from "src/app/models/role";
import { getCookie } from "typescript-cookie";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  private _role$ = new BehaviorSubject<string>(Role.NON.toString());
  role$ = this._role$.asObservable();

  constructor() {
    const admin = getCookie("role");

    this._role$.next(admin ?? Role.NON);
  }

  setRole(admin: Role) {
    this._role$.next(admin);
  }
}
