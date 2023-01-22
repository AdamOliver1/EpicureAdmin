import { RestaurantService } from "./../../../services/restaurantService/restaurant.service";
import { Component, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";
import Dish from "src/app/models/Dish";
import { DishService } from "src/app/services/dishService/dish.service";
import { IDishRow, Type } from "../../common/table/tableRow";
import { FieldBase } from "../../form/fieldBase";
import Restaurant from "src/app/models/Restaurant";
import { DishFormService } from "../../form/services/dishForm/dish-form.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-dishes",
  templateUrl: "./dishes.component.html",
  styleUrls: ["./dishes.component.scss"],
})
export class DishesComponent implements OnInit {
  headers = [
   
    "name",
    "image",
    "restaurant",
    "tags",
    "ingredients",
    "price",
  ];

  @Output() dataSource: IDishRow[] = [];
  showForm = false;
  allRestaurants: Restaurant[];
  dishToUpdate:Dish;
  constructor(
    private dishService: DishService,
    private restaurantService: RestaurantService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

    this.restaurantService.readAll('dish').subscribe((data) => {
      this.allRestaurants = data;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params["id"];
      if (id) {
          this.showForm = true;
      }
    });

    this.dishService.readAll('dish').subscribe((data: Dish[]) => {
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


  onFormClose() {
    this.router.navigateByUrl("/dish");
    this.showForm = false;
    this.ngOnInit();
  }

  onClickCreate() {
    this.showForm = true;
  }


  onEmitRefresh(){
    this.ngOnInit();
      }


}
