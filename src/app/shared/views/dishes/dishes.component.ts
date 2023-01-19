import { Component, Output } from "@angular/core";
import Dish from "src/app/models/Dish";
import { DishService } from "src/app/services/dishService/dish.service";
import { ITableRow } from "../../common/table/tableRow";

export interface IDishRow extends ITableRow {
  price: number;
  ingredients?: string[];
  tags?: string[];
  restaurant: string;
  image: string;
}

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
  constructor(private dishService: DishService) {}
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
}
