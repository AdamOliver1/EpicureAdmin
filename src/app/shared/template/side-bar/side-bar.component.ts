import { LoginService } from "./../../../services/loginService/login.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"],
})
export class SideBarComponent implements OnInit {
  username?: string;

  constructor(private loginService: LoginService) {}
  ngOnInit(): void {
    this.username = this.loginService.getUsername() || '';
    // this.loginService.LoginEmitter.subscribe((islogin) => {
      // console.log("emitttt",islogin);
      
      // console.log(this.username);
      
    // });
  }
}
