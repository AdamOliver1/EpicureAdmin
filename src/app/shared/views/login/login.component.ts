import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import IUser from 'src/app/models/User';
import { LoginService } from 'src/app/services/loginService/login.service';
import { getCookie, setCookie } from 'typescript-cookie'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private loginService:LoginService,
    private route:Router) { }

  ngOnInit() {
    if(this.loginService.checkedLogin()){
      this.route.navigate(['restaurant'])
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const {username,password} = this.loginForm.value;
   this.loginService.login(username,password).subscribe({
    next:(user:any) => {
      console.log(user);
      
      setCookie('login',user.username)
this.route.navigate(['restaurant'])
    },
    error:(err) => console.log(err)
   })
  }

  get password() {
    return this.getField('password')
  }

  get username() {
    return this.getField('username')
  }

  private getField(field: string) {
    return this.loginForm.get(field);
  }
}
