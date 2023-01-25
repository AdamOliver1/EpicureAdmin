import { ApiService } from "src/app/services/apiService/api.service";
import { Component, OnInit, Output, ViewChild } from "@angular/core";
import Restaurant from "src/app/models/Restaurant";
import { IRestaurantRow, ITableRow, Type } from "../../common/table/tableRow";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Chef } from "src/app/models/Chef";
import { RoleService } from "src/app/services/roleService/role.service";
import { Role } from "src/app/models/role";

@Component({
  selector: "app-restaurants",
  templateUrl: "./restaurants.component.html",
  styleUrls: ["./restaurants.component.scss"],
})
export class RestaurantsComponent implements OnInit {
  @Output() dataSource: IRestaurantRow[] = [];
  protected headers = ["name", "image", "chef", "stars"];
  protected showForm = false;
  protected restaurantToUpdate: Restaurant;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restaurantService: ApiService<Restaurant>,
    public roleService: RoleService
  ) {}

  ngOnInit(): void {
    this._initDataSource();
    this.route.params.subscribe((params) => {
      if (params["id"]) this.showForm = true;
    });
  }

 
  protected onClickCreate() {
    this.showForm = true;
  }

  protected onEmitRefresh() {
    this.showForm = false;
    this._initDataSource();
    this.router.navigateByUrl("/restaurant");
  }
  private _initDataSource() {
    this.restaurantService
      .readAll("restaurant")
      .subscribe((data: Restaurant[]) => {
        this.dataSource = [];
        data.forEach((restaurant, i) => {
          this.dataSource.push({
            type: Type.Restaurant,
            id: restaurant._id,
            position: i + 1,
            name: restaurant.name,
            image: restaurant.image,
            stars: restaurant.stars,
            chef: restaurant.chef.name,
          });
        });
      });
  }
}
