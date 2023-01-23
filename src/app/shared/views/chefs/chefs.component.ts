import { Component, Output } from "@angular/core";
import { IChefRow, Type } from "../../common/table/tableRow";
import { Chef } from "src/app/models/Chef";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/services/apiService/api.service";
@Component({
  selector: "app-chefs",
  templateUrl: "./chefs.component.html",
  styleUrls: ["./chefs.component.scss"],
})
export class ChefsComponent {
  headers = ["position", "name", "image", "description"];
  @Output() dataSource: IChefRow[] = [];

  showForm: boolean;
  chefToUpdate: Chef;

  constructor(
    private route: ActivatedRoute,
    private chefService: ApiService<Chef>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params["id"];
      if (id) {
        this.showForm = true;
      }
      this.createDataSource();
    });
  }

  createDataSource() {
    this.chefService.readAll("chef").subscribe((data: Chef[]) => {
      this.dataSource = [];
      data.forEach((chef, i) => {
        this.dataSource.push({
          type: Type.Chef,
          id: chef._id,
          position: i + 1,
          name: chef.name,
          image: chef.image,
          description: chef.description,
        });
      });
    });
  }
  onEmitRefresh() {
    this.createDataSource();
    this.showForm = false;
  }

  onClick() {
    this.showForm = true;
  }
}
