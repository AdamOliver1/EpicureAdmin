import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import IUser from "src/app/models/User";
import { LoginService } from "src/app/services/loginService/login.service";
import { getCookie, setCookie } from "typescript-cookie";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "src/app/services/auth.interceptor";
import { RoleService } from "src/app/services/roleService/role.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  protected loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: Router
  ) {}

  ngOnInit() {
    if (this.loginService.checkedLogin()) {
      this.route.navigate(["restaurant"]);
    }
    this._buildForm();
  }

 

  onSubmit() {
    const { username, password } = this.loginForm.value;
    this.loginService.login(username, password).subscribe({
      next: (data: any) => {
        this.route.navigate(["restaurant"]);
      },
      error: (err) => console.log(err),
    });
  }

  protected get password() {
    return this._getField("password");
  }

  protected get username() {
    return this._getField("username");
  }

  private _getField(field: string) {
    return this.loginForm.get(field);
  }
  private _buildForm() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
}
