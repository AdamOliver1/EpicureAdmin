import { ApiService } from "src/app/services/apiService/api.service";
import { Component, OnInit, Output, ViewChild } from "@angular/core";
import Restaurant from "src/app/models/Restaurant";
import { IRestaurantRow, ITableRow, Type } from "../../common/table/tableRow";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Chef } from "src/app/models/Chef";

@Component({
  selector: "app-restaurants",
  templateUrl: "./restaurants.component.html",
  styleUrls: ["./restaurants.component.scss"],
})
export class RestaurantsComponent implements OnInit {
  headers = ["name", "image", "chef", "stars"];
  @Output() dataSource: IRestaurantRow[] = [];
  showForm = false;
  restaurantToUpdate: Restaurant;
  chefs: Chef[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chefService: ApiService<Chef>,
    private restaurantService: ApiService<Restaurant>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params["id"];
      if (id) {
        this.showForm = true;
      }
    });

    this.chefService.readAll("chef").subscribe((data) => {
      this.chefs = data;
    });

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
        console.log(this.dataSource);
      });
  }

  onFormClose() {
    this.router.navigateByUrl("/restaurant");
    this.showForm = false;
    this.ngOnInit();
    this.ngOnInit();
  }

  onClickCreate() {
    this.showForm = true;
  }



  onEmitRefresh() {
    this.showForm = false;
    this.ngOnInit();
  }
}
