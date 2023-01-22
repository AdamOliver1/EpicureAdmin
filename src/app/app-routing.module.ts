import { RestaurantsComponent } from './shared/views/restaurants/restaurants.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { ChefsComponent } from './shared/views/chefs/chefs.component';
import { DishesComponent } from './shared/views/dishes/dishes.component';

const routes: Routes = [
  {path:'' , component:DefaultComponent,children:[
    {path:'',component:RestaurantsComponent},
    {path:'restaurant',component:RestaurantsComponent},
    {path:'restaurant/:id',component:RestaurantsComponent},
    {path:'chef',component:ChefsComponent},
    {path:'chef/:id',component:ChefsComponent},
    {path:'dish',component:DishesComponent},
    {path:'dish/:id',component:DishesComponent},
  ]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
