import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Chef } from "src/app/models/Chef";
import { ApiService } from "src/app/services/apiService/api.service";

@Component({
  selector: "app-chef-of-the-week-form",
  templateUrl: "./chef-of-the-week-form.component.html",
  styleUrls: ["./chef-of-the-week-form.component.scss"],
})
export class ChefOfTheWeekFormComponent implements OnInit {
  isSubmitted = false;
  isUpdate = false;
  form: FormGroup;

  @Output() close = new EventEmitter();
  chefs: { key: string; value: string }[] = [];
  newChef: Chef;

  constructor(private fb: FormBuilder, private chefService: ApiService<Chef>) {}

  ngOnInit(): void {
   this._initChefs();
    this.getChefOfTheWeek();
    this._createForm();
  }

  private _initChefs(){
    this.chefService.readAll("chef").subscribe((data) => {
      data.forEach((c) => {
        this.chefs.push({ key: c._id, value: c.name });
      });
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    this.chefService.update({_id:this.form.value.chef} as Chef,`chef/chefweek`).subscribe();
  }

  getChefOfTheWeek() {
    this.chefService.get("chef/chefweek").subscribe({
      next: (chef) => {
        this.form.controls["chef"].setValue(chef._id)
      },
      error: (err) => console.log(err),
    });
  }

  onCloseClick() {
    this.close.emit();
   
  }

  get chef() {
    return this.form.get("chef");
  }

  private _createForm() {
    this.form = this.fb.group({
      chef: [{} as Chef,Validators.required],
    });
  }
}
