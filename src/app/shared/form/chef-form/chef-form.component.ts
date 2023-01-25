import { Chef } from "src/app/models/Chef";
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
  @Output() close = new EventEmitter();
  
  protected form: FormGroup;
  protected isSubmitted = false;

  private chefToUpdate: Chef;
  private isUpdate = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService<Chef>
  ) {}

  ngOnInit(): void {
    this._createForm();
   this._checkIfUpdate();
  }

  protected get buttonSubmit() {
    return this.isUpdate ? "Update" : "Create";
  }

  protected get name() {
    return this._getStringField("name");
  }

  protected get image() {
    return this._getStringField("image");
  }

  protected get description() {
    return this._getStringField("description");
  }

  protected onSubmit() {
    
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

  protected onCloseClick() {
    this.close.emit();
  }

  private _getStringField(field: string) {
    return this.form.get(field);
  }

  private _checkIfUpdate(){
    this.route.params.subscribe((params) => {
      const id = params["id"];
      if (id) {
        this.apiService.readOne(id, "chef").subscribe((chef) => {
          this.isUpdate = true;
          this.chefToUpdate = chef;
          this._createForm();
        });
      }
    });
  }

  private _createForm() {
    this.form = this.fb.group({
      _id: this.chefToUpdate?._id,
      name: [this.chefToUpdate?.name, Validators.required],
      image: [this.chefToUpdate?.image, Validators.required],
      description: [this.chefToUpdate?.description, Validators.required],
    });
  }
}
