import { ApiService } from "src/app/services/apiService/api.service";
import { Component, OnInit, Output } from "@angular/core";
import Dish from "src/app/models/Dish";
import { IDishRow, Type } from "../../common/table/tableRow";
import Restaurant from "src/app/models/Restaurant";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "src/app/services/adminService/admin.service";
import { Admin } from "src/app/models/Admin";

@Component({
  selector: "app-dishes",
  templateUrl: "./dishes.component.html",
  styleUrls: ["./dishes.component.scss"],
})
export class DishesComponent implements OnInit {
  headers = ["name", "image", "restaurant", "tags", "ingredients", "price"];

  @Output() dataSource: IDishRow[] = [];
  showForm = false;
  allRestaurants: Restaurant[];
  dishToUpdate: Dish;
  isCRUDAdmin = false;
  constructor(
    private restaurantService: ApiService<Restaurant>,
    private dishService: ApiService<Dish>,
    private router: Router,
    private route: ActivatedRoute,
    private adminService:AdminService
  ) {
    this.restaurantService.readAll("dish").subscribe((data) => {
      this.allRestaurants = data;
    });
  }

  ngOnInit(): void {
    this.adminService.admin$.subscribe(admin => {
      this.isCRUDAdmin = admin === Admin.CRUD;
    })

    this.route.params.subscribe((params) => {
      const id = params["id"];
      if (id) {
        this.showForm = true;
      }
      this.createDataSource();
    });

    
  }


  onClickCreate() {
    this.showForm = true;
  }

  onEmitRefresh() {
    this.createDataSource();
     this.showForm = false;
    this.router.navigate(['dish']);
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
}
