import { Component, Output } from "@angular/core";
import { IChefRow, Type } from "../../common/table/tableRow";
import { Chef } from "src/app/models/Chef";
import { ActivatedRoute, Router, TitleStrategy } from "@angular/router";
import { ApiService } from "src/app/services/apiService/api.service";
import { AdminService } from "src/app/services/adminService/admin.service";
import { Admin } from "src/app/models/Admin";
@Component({
  selector: "app-chefs",
  templateUrl: "./chefs.component.html",
  styleUrls: ["./chefs.component.scss"],
})
export class ChefsComponent {
  headers = ["position", "name", "image", "description"];
  @Output() dataSource: IChefRow[] = [];
  showFormChefOfTheWeek: boolean;
  showForm: boolean;
  chefToUpdate: Chef;
isCRUDAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private chefService: ApiService<Chef>,
    private router: Router,
    public adminService:AdminService
  ) {}

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
    this.showFormChefOfTheWeek = false;
    this.router.navigate(['chef'])
  }

  onClickCreate() {
    this.showForm = true;
  }

  onClickChefOfTheWeek() {
    this.showFormChefOfTheWeek = true;
  }
}
