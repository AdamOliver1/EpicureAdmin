import { RestaurantService } from './../../../services/restaurantService/restaurant.service';
import { DishFormService } from './../../form/services/dishForm/dish-form.service';
import { Component, Output } from "@angular/core";
import { Observable } from "rxjs";
import Dish from "src/app/models/Dish";
import { DishService } from "src/app/services/dishService/dish.service";
import { IDishRow, ITableRow } from "../../common/table/tableRow";
import { FieldBase } from "../../form/fieldBase";


@Component({
  selector: "app-dishes",
  templateUrl: "./dishes.component.html",
  styleUrls: ["./dishes.component.scss"],
})
export class DishesComponent {
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
      // console.log(this.dataSource);
    });
  }

  closeCard(){
    this.showForm = false;
  }

  onClick(){
    this.showForm = true;
  }
}
