import { Observable } from "rxjs";
import { ChangeDetectorRef, Component, Output } from "@angular/core";
import { IChefRow, ITableRow, Type } from "../../common/table/tableRow";
import { Chef } from "src/app/models/Chef";
import { FieldBase } from "../../form/fieldBase";
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

  formFields: Observable<FieldBase<any>[]>;
  showForm: boolean;
  chefToUpdate: Chef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService<Chef>,
  ) {
  }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params["id"];
      if (id) {
          this.showForm = true;
      }
    });

    this.apiService.readAll("chef").subscribe((data: Chef[]) => {
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

  onEmitRefresh(){
this.ngOnInit();
  }

  onFormClose() {
    this.router.navigateByUrl("/chef");
    this.showForm = false;
    this.ngOnInit();
    this.ngOnInit();
  }

  onClick() {
    this.showForm = true;
  }
}
