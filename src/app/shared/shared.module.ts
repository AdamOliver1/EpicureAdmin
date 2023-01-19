import { NgModule } from '@angular/core';
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
import { FormComponent } from './common/form/form.component';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
// import { DynamicFormComponent } from './dynamic-form.component';
// import { DynamicFormQuestionComponent } from './dynamic-form-question.component';

@NgModule({
  declarations: [
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
  ],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    HttpClientModule,
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
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    TableComponent
  ]
})
export class SharedModule { }


