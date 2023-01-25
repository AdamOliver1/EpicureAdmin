import { ApiService } from "src/app/services/apiService/api.service";
import { Component, OnInit, Output } from "@angular/core";
import Dish from "src/app/models/Dish";
import { IDishRow, Type } from "../../common/table/tableRow";
import Restaurant from "src/app/models/Restaurant";
import { ActivatedRoute, Router } from "@angular/router";
import { RoleService } from "src/app/services/roleService/role.service";
import { Role } from "src/app/models/role";

@Component({
  selector: "app-dishes",
  templateUrl: "./dishes.component.html",
  styleUrls: ["./dishes.component.scss"],
})
export class DishesComponent implements OnInit {
  @Output() dataSource: IDishRow[] = [];
  protected headers = ["name", "image", "restaurant", "tags", "ingredients", "price"];

  protected showForm = false;
  protected dishToUpdate: Dish;

  constructor(
    private dishService: ApiService<Dish>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createDataSource();
   this._checkIfUpdate();
  }
  
  protected onClickCreate() {
    this.showForm = true;
  }
  
  protected onEmitRefresh() {
    this.createDataSource();
    this.showForm = false;
    this.router.navigate(["dish"]);
  }
  
  private createDataSource() {
    this.dishService.readAll("dish").subscribe((data: Dish[]) => {
      this.dataSource = [];
      data.forEach((dish, i) => {
        this.dataSource.push({
          type: Type.Dish,
          id: dish._id,
          position: i + 1,
          name: dish.name,
          image: dish.image,
          restaurant: { key: dish.restaurant._id, value: dish.restaurant.name },
          tags: dish.tags,
          ingredients: dish.ingredients,
          price: dish.price,
        });
      });
    });
  }

  private _checkIfUpdate(){
    this.route.params.subscribe((params) => {
      if (params["id"]) this.showForm = true;
    });
  }

 
}
