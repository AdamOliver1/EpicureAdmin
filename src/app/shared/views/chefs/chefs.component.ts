import { Observable } from "rxjs";
import { ChefService } from "./../../../services/chefService/chef.service";
import { DishService } from "./../../../services/dishService/dish.service";
import { Component, Output } from "@angular/core";
import { IChefRow, ITableRow } from "../../common/table/tableRow";
import { Chef } from "src/app/models/Chef";
import { FieldBase } from "../../form/fieldBase";
import { ChefFormService } from "../../form/services/chefForm/chef-form.service";


@Component({
  selector: "app-chefs",
  templateUrl: "./chefs.component.html",
  styleUrls: ["./chefs.component.scss"],
})

//TODO divide data source and form to components
export class ChefsComponent {
  headers = ["position", "name", "image", "description"];
  @Output() dataSource: IChefRow[] = [];

  formFields: Observable<FieldBase<any>[]>;
  showForm = false;

  constructor(
    private chefService: ChefService,
    private chefFormService: ChefFormService
  ) {
    this.formFields = this.chefFormService.getFields();
  }

  ngOnInit(): void {
    this.chefService.readAll().subscribe((data: Chef[]) => {
      this.dataSource = [];
      data.forEach((chef, i) => {
        this.dataSource.push({
          position: i + 1,
          name: chef.name,
          image: chef.image,
          description: chef.description,
        });
      });
      console.log(this.dataSource);
    });
  }

  closeCard() {
    this.showForm = false;
  }

  onClick() {
    this.showForm = true;
  }
}
