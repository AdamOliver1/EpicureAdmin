import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DefaultComponent } from './default/default.component';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    DefaultComponent
  ],
  imports: [
    MatSidenavModule,
    RouterModule,
    SharedModule,
  ],
  
})
export class LayoutModule { }
