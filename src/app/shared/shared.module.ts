import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './template/header/header.component';
import { SideBarComponent } from './template/side-bar/side-bar.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list'; 
import { FooterComponent } from './template/footer/footer.component';
import { RestaurantsComponent } from './views/restaurants/restaurants.component';
import {MatTableModule} from '@angular/material/table';
import { TableComponent } from './common/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageCardComponent } from './common/image-card/image-card.component';
import { DishesComponent } from './views/dishes/dishes.component';
import { ChefsComponent } from './views/chefs/chefs.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { CreateButtonComponent } from './common/create-button/create-button.component';
import { FormComponent } from './form/form/form.component';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormFieldComponent } from './form/dynamic-form-field/dynamic-form-field.component';
import { DishService } from '../services/dishService/dish.service';
import { RestaurantService } from '../services/restaurantService/restaurant.service';
import { ChefService } from '../services/chefService/chef.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChefFormComponent } from './form/chef-form/chef-form.component';
import { ChefFormService } from './form/services/chefForm/chef-form.service';
import { DishFormComponent } from './form/dish-form/dish-form.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RestaurantFormComponent } from './form/restaurant-form/restaurant-form.component';

@NgModule({
  declarations: [
    DynamicFormFieldComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    RestaurantsComponent,
    TableComponent,
    ImageCardComponent,
    DishesComponent,
    ChefsComponent,
    CreateButtonComponent,
    FormComponent,
    ChefFormComponent,
    DishFormComponent,
    RestaurantFormComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTooltipModule,
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatListModule,
    RouterModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    TableComponent,
    DishesComponent,
  ],
  providers:[
    DishService,
    RestaurantService,
    ChefFormService,
    // { provide: ChefFormService, useExisting: ChefFormService },
    ChefService,
  ]
})
export class SharedModule { }


