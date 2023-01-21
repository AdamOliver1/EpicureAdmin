import { RestaurantService } from './../../../services/restaurantService/restaurant.service';
import { DishFormService } from './../../form/services/dishForm/dish-form.service';
import { Component, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";
import Dish from "src/app/models/Dish";
import { DishService } from "src/app/services/dishService/dish.service";
import { IDishRow } from "../../common/table/tableRow";
import { FieldBase } from "../../form/fieldBase";


@Component({
  selector: "app-dishes",
  templateUrl: "./dishes.component.html",
  styleUrls: ["./dishes.component.scss"],
})
export class DishesComponent implements OnInit {
  headers = [
    "position",
    "name",
    "image",
    "restaurant",
    "tags",
    "ingredients",
    "price",
  ];

  @Output() dataSource: IDishRow[] = [];
  showForm = false;
  formFields: Observable<FieldBase<any>[]>;

  constructor(private dishService: DishService,
    private restaurantService:RestaurantService,
    private dishFormService:DishFormService) {
    this.restaurantService.readAll().subscribe(data => {
      this.formFields = this.dishFormService.getFields(data);
    })
  }

  ngOnInit(): void {
    console.log("ngOnInit");
    
    this.dishService.readAll().subscribe((data: Dish[]) => {
     console.log("data: ",data);
     
      this.dataSource = [];
      data.forEach((dish, i) => {
        this.dataSource.push({
          position: i + 1,
          name: dish.name,
          image: dish.image,
          restaurant: dish.restaurant.name,
          tags: dish.tags,
          ingredients: dish.ingredients,
          price: dish.price,
        });
      });
    });
  }

 async onFormSubmit(payload:any){//https://res.cloudinary.com/do7fhccn2/image/upload/v1673797550/Epicure/assets/dishes/smokedPizza_hnl5yp.svg
  const tags = [];
  if(payload.spicy === true) tags.push('spicy');
  if(payload.vegan === true) tags.push('vegan');
  if(payload.vegetarian === true) tags.push('vegetarian');
  const res = payload as Dish;
  res.price = Number(res.price);
  res.tags = tags;
  console.log("dish");
  
  console.log(res);
  
  //  await this.dishService.create(res).subscribe();
  }

  onFormClose(){
    console.log("onFormClose");
    
    this.showForm = false;
  }

  onClick(){
    this.showForm = true;
  }
}
