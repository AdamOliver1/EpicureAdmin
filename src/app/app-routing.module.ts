import { DishesComponent } from './shared/views/dishes/dishes.component';
import { RestaurantsComponent } from './shared/views/restaurants/restaurants.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { ChefsComponent } from './shared/views/chefs/chefs.component';

const routes: Routes = [
  {path:'' , component:DefaultComponent,children:[
    {path:'',component:RestaurantsComponent},
    {path:'restaurant',component:RestaurantsComponent},
    {path:'chef',component:ChefsComponent},
    {path:'dish',component:DishesComponent},
  ]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
