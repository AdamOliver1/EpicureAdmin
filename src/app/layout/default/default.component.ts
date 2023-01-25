import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/loginService/login.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit  {
  sideBarOpen = false;
  constructor(public loginService:LoginService) { }

  ngOnInit(): void {
  }
  sideBarToggle()
  {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
