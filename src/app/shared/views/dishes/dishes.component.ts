import { RestaurantService } from "./../../../services/restaurantService/restaurant.service";
import { DishFormService } from "./../../form/services/dishForm/dish-form.service";
import { Component, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";
import Dish from "src/app/models/Dish";
import { DishService } from "src/app/services/dishService/dish.service";
import { IDishRow, Type } from "../../common/table/tableRow";
import { FieldBase } from "../../form/fieldBase";
import Restaurant from "src/app/models/Restaurant";

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
    "operations",
  ];

  @Output() dataSource: IDishRow[] = [];
  showForm = false;
  formFields: Observable<FieldBase<any>[]>;
  allRestaurants: Restaurant[];

  constructor(
    private dishService: DishService,
    private restaurantService: RestaurantService,
    private dishFormService: DishFormService
  ) {

    this.restaurantService.readAll().subscribe((data) => {
      this.allRestaurants = data;
    });

    this.dishFormService.EditDishEmitter.subscribe(data => {
      console.log("data: ");
      console.log(data);
      this.formFields = this.dishFormService.getFields(this.allRestaurants,data);
      this.showForm = true;
    })
  }

  ngOnInit(): void {
    console.log("ngOnInit");

    this.dishService.readAll().subscribe((data: Dish[]) => {
      console.log("data: ", data);

      this.dataSource = [];
      data.forEach((dish, i) => {
        this.dataSource.push({
          type: Type.Dish,
          id: dish._id,
          position: i + 1,
          name: dish.name,
          image: dish.image,
          restaurant: {key:dish.restaurant._id,value:dish.restaurant.name},
          tags: dish.tags,
          ingredients: dish.ingredients,
          price: dish.price,
        });
      });
    });
  }

  onFormSubmit(payload: any) {
    console.log("dish");
    console.log(payload);
    const tags = [];
    if (payload.spicy === true) tags.push("spicy");
    if (payload.vegan === true) tags.push("vegan");
    if (payload.vegetarian === true) tags.push("vegetarian");
    const res = payload;
    res.price = Number(res.price);
    res.tags = tags;
    res.restaurant = res.restaurant.key;

    //TODO ask mentor
    if (!payload.isTrusted) {
      console.log("dish");
      console.log(payload);
      // console.log(res);
      // this.dishService.create(res).subscribe();
    }
  }

  onFormClose(event: any) {
    console.log("onFormClose");
    this.showForm = false;
  }

  onClickCreate() {
    this.formFields = this.dishFormService.getFields(this.allRestaurants);
    this.showForm = true;
  }
}
