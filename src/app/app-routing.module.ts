import { RestaurantsComponent } from './shared/views/restaurants/restaurants.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { ChefsComponent } from './shared/views/chefs/chefs.component';
import { DishesComponent } from './shared/views/dishes/dishes.component';
import { LoginComponent } from './shared/views/login/login.component';
import { AuthGuard } from './shared/guards/auth-guard.guard';

const routes: Routes = [
  {path:'' , component:DefaultComponent,children:[
    {path:'',component:LoginComponent},
    {path:'login',component:LoginComponent},
    {path:'restaurant',component:RestaurantsComponent,canActivate:[AuthGuard]},
    {path:'restaurant/:id',component:RestaurantsComponent,canActivate:[AuthGuard]},
    {path:'chef',component:ChefsComponent,canActivate:[AuthGuard]},
    {path:'chef/:id',component:ChefsComponent,canActivate:[AuthGuard]},
    {path:'dish',component:DishesComponent,canActivate:[AuthGuard]},
    {path:'dish/:id',component:DishesComponent,canActivate:[AuthGuard]},
  ]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
