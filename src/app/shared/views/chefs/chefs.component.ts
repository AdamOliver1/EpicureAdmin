import { Component, Output } from "@angular/core";
import { IChefRow, Type } from "../../common/table/tableRow";
import { Chef } from "src/app/models/Chef";
import { ActivatedRoute, Router, TitleStrategy } from "@angular/router";
import { ApiService } from "src/app/services/apiService/api.service";
import { RoleService } from "src/app/services/roleService/role.service";

@Component({
  selector: "app-chefs",
  templateUrl: "./chefs.component.html",
  styleUrls: ["./chefs.component.scss"],
})
export class ChefsComponent {
  @Output() dataSource: IChefRow[] = [];

 protected headers = ["position", "name", "image", "description"];

 protected showFormChefOfTheWeek: boolean;
 protected showForm: boolean;
 protected chefToUpdate: Chef;

  constructor(
    private route: ActivatedRoute,
    private chefService: ApiService<Chef>,
    private router: Router,
    public roleService: RoleService
  ) {}

  ngOnInit(): void {
    this._createDataSource();
   this._checkIfUpdate();
  }

  private _checkIfUpdate(){
    this.route.params.subscribe((params) => {
      if (params["id"]) this.showForm = true;
    });
  }

  protected onEmitRefresh() {
    this._createDataSource();
    this.showForm = false;
    this.showFormChefOfTheWeek = false;
    this.router.navigate(["chef"]);
  }

  protected onClickCreate() {
    this.showForm = true;
  }

  protected onClickChefOfTheWeek() {
    this.showFormChefOfTheWeek = true;
  }

  private _createDataSource() {
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
}
