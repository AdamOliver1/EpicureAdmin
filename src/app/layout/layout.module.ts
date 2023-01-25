import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DefaultComponent } from './default/default.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    DefaultComponent
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    RouterModule,
    SharedModule,
    CommonModule,
  ],
  
})
export class LayoutModule { }
