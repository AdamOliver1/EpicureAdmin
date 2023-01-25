import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chef } from 'src/app/models/Chef';
import Restaurant from 'src/app/models/Restaurant';
import { ApiService } from 'src/app/services/apiService/api.service';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.scss']
})
export class RestaurantFormComponent  implements OnInit {
 
  @Output() close = new EventEmitter();

  private isUpdate = false;
  private restaurantToUpdate: Restaurant;

  protected form: FormGroup;
  protected isSubmitted = false;
  protected chefs: { key: string; value: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private chefService: ApiService<Chef>,
    private restaurantService: ApiService<Restaurant>
  ) {}

  ngOnInit(): void {
   
  this._initChefs();
    this._createForm();
   this._checkIfUpdate();
  }

  private _checkIfUpdate(){
    this.route.params.subscribe((params) => {
      const id = params["id"];
      if (id) {
        this.restaurantService.readOne(id, "restaurant").subscribe((restaurant) => {
          this.isUpdate = true;
          this.restaurantToUpdate = restaurant;
          this._createForm();
        });
      }
    });
  }

  private _initChefs(){
    this.chefService.readAll("chef").subscribe((data) => {
      data.forEach((c) => {
        this.chefs.push({ key: c._id, value: c.name });
      });
    });
  }

  private _createForm() {
    this.form = this.fb.group({
      _id: this.restaurantToUpdate?._id,
      name: [this.restaurantToUpdate?.name, Validators.required],
      image: [this.restaurantToUpdate?.image, Validators.required],
      stars: [
        this.restaurantToUpdate?.stars,
        [Validators.required, Validators.min(1),Validators.max(5)],
      ],
      chef: [this.restaurantToUpdate?.chef, Validators.required],
    });
  }

  protected get name() {
    return this._getField("name");
  }
  protected get chef() {
    return this._getField("chef");
  }

  protected get buttonSubmit() {
    return this.isUpdate ? "Update" : "Create";
  }

  protected get image() {
    //https://res.cloudinary.com/do7fhccn2/image/upload/v1673957583/epicure2/Epicure_2023-01-16_11_23/chefs/untitled-1_3x_1_lyvriu.png
    return this._getField("image");
  }
  protected get stars() {
    return this._getField("stars");
  }

  protected onSubmit() {
    const {value} = this.form;
    if (this.isUpdate) {
      this.restaurantService.update(value, "restaurant").subscribe();
    } else {
      this.restaurantService.create(value, "restaurant").subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err),
      });
    }
    this.isSubmitted = true;
  }

  protected onCloseClick() {
    this.close.emit();
  }

  private _getField(field: string) {
    return this.form.get(field);
  }
}
