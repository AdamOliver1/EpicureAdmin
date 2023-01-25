import { ActivatedRoute } from "@angular/router";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/apiService/api.service";
import IModel from "src/app/models/IModel";
import { RoleService } from "src/app/services/roleService/role.service";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() dataSource: any[];
  @Input() headers: string[];
  @Output() deleteEmitter = new EventEmitter();
  showImageCard = false;
  imageUrl: string;
  spicyUrl = "../../../../assets/dishesIcons/spicy.svg";
  veganUrl = "../../../../assets/dishesIcons/vegan.svg";
  vegetarianUrl = "../../../../assets/dishesIcons/vegetarian.svg";
  selectedOption: string;
  url: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService<IModel>,
    public roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.url = this.route.snapshot.routeConfig?.path;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["headers"]) {
      if (!this.headers.find((h) => h === "operations")) {
        this.headers.push("operations");
      }
    }
  }

  openImageCard(url: string) {
    this.showImageCard = true;
    this.imageUrl = url;
  }

  closeImageCard() {
    this.showImageCard = false;
  }

  onDeleteClick(element: any) {
    this.deleteEmitter.emit();
    if (this.url !== undefined) {
      this.apiService.delete(element.id, this.url).subscribe();
    }
  }

  onEditClick(element: any) {
    this.router.navigateByUrl(`${this.url}/${element.id}`);
  }
}
