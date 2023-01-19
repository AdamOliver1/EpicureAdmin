import { RestaurantService } from "./../../../services/restaurantService/restaurant.service";
import { Component, OnInit, Output, ViewChild } from "@angular/core";
import Restaurant from "src/app/models/Restaurant";
import { ITableRow } from "../../common/table/tableRow";


export interface IRestaurantRow extends ITableRow{
  chef: string;
  stars: number;
  image:string;
}

@Component({
  selector: "app-restaurants",
  templateUrl: "./restaurants.component.html",
  styleUrls: ["./restaurants.component.scss"],
})

export class RestaurantsComponent implements OnInit{
headers = ["position","name","image","chef","stars"]
 @Output() dataSource:IRestaurantRow[] = []
 showForm = false;
  constructor(private restaurantService: RestaurantService) {
  
  }
  ngOnInit(): void {
    this.restaurantService.readAll().subscribe((data:Restaurant[]) => {
      this.dataSource = []; 
      data.forEach((restaurant,i) => {
        this.dataSource.push({
          position:i + 1,
          name:restaurant.name,
          image:restaurant.image,
          stars:restaurant.stars,
          chef:restaurant.chef.name
        })
      });
      console.log(this.dataSource);
    });
  }

  onClick() {
    this.showForm = true;
    console.log('Button clicked!');
  }
}
