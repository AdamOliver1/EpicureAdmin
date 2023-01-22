import { DishesComponent } from './shared/views/dishes/dishes.component';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// Material
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutModule } from "./layout/layout.module";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";


@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    // DishesComponent,
    BrowserModule,
    HttpClientModule,
    LayoutModule,
    AppRoutingModule,
    // MatToolbarModule,
    // MatSidenavModule,
    // MatListModule,
    // MatButtonModule,
    // MatIconModule,
    // BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
