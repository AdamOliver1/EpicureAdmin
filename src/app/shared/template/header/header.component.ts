import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/loginService/login.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { getCookie, setCookie } from "typescript-cookie";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidebarForme: EventEmitter<any> = new EventEmitter();

  constructor(private loginService:LoginService,private router:Router){

  }

  toggleSidebar() {
    this.toggleSidebarForme.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 200);
  }

  signOutClick(){
this.loginService.logout();
// this.loginService.LoginEmitter.next(false);
this.router.navigate(['login'])
  }
}
