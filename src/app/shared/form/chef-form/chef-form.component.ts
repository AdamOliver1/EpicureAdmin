import { Chef } from "src/app/models/Chef";
import { ChefService } from "src/app/services/chefService/chef.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/services/apiService/api.service";

@Component({
  selector: "app-chef-form",
  templateUrl: "./chef-form.component.html",
  styleUrls: ["./chef-form.component.scss"],
})
export class ChefFormComponent implements OnInit {
  form: FormGroup;
  @Output() close = new EventEmitter();

  chefToUpdate: Chef;
  isUpdate = false;
  isSubmitted = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService<Chef>
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.route.params.subscribe((params) => {
      const id = params["id"];
      if (id) {
        this.apiService.readOne(id, "chef").subscribe((chef) => {
          this.isUpdate = true;
          this.chefToUpdate = chef;
          this.createForm();
        });
      }
    });
  }

  private createForm() {
    this.form = this.fb.group({
      _id: this.chefToUpdate?._id,
      name: [this.chefToUpdate?.name, Validators.required],
      image: [this.chefToUpdate?.image, Validators.required],
      description: [this.chefToUpdate?.description, Validators.required],
    });
  }

  get buttonSubmit() {
    return this.isUpdate ? "Update" : "Create";
  }

  get name() {
    return this.getStringField("name");
  }

  get image() {
    //https://res.cloudinary.com/do7fhccn2/image/upload/v1673957583/epicure2/Epicure_2023-01-16_11_23/chefs/untitled-1_3x_1_lyvriu.png
    return this.getStringField("image");
  }

  get description() {
    return this.getStringField("description");
  }

  onSubmit() {
    if (this.isUpdate) {
      this.apiService.update(this.form.value, "chef").subscribe();
    } else {
      this.apiService.create(this.form.value, "chef").subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err),
      });
    }
    this.isSubmitted = true;
  }

  onCloseClick() {
    this.close.emit();
  }

  private getStringField(field: string) {
    return this.form.get(field);
  }
}
