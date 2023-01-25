import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import IUser from "src/app/models/User";
import { LoginService } from "src/app/services/loginService/login.service";
import { getCookie, setCookie } from "typescript-cookie";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "src/app/services/auth.interceptor";
import { AdminService } from "src/app/services/adminService/admin.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers:[ {
    provide:HTTP_INTERCEPTORS, //DI
    useClass:AuthInterceptor,
    multi:true // there can be multi http interceptors (one for every req)
  }]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: Router,
    private adminService:AdminService
  ) {}

  ngOnInit() {
    
    if (this.loginService.checkedLogin()) {
      this.route.navigate(["restaurant"]);
    }
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    this.loginService.login(username, password).subscribe({
      next: (data: any) => {
        
       
        this.route.navigate(["restaurant"]);
        // this.loginService.LoginEmitter.next(true);
      },
      error: (err) => console.log(err),
    });
  }

  get password() {
    return this.getField("password");
  }

  get username() {
    return this.getField("username");
  }

  private getField(field: string) {
    return this.loginForm.get(field);
  }
}
