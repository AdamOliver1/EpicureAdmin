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
 
  isSubmitted = false;
  isUpdate = false;
  restaurantToUpdate: Restaurant;
  form: FormGroup;
  @Output() close = new EventEmitter();
  chefs: { key: string; value: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private chefService: ApiService<Chef>,
    private restaurantService: ApiService<Restaurant>
  ) {}

  ngOnInit(): void {
    this.chefService.readAll("chef").subscribe((data) => {
      console.log(data);
      
      data.forEach((c) => {
        this.chefs.push({ key: c._id, value: c.name });
      });
    });

    this.createForm();
    this.route.params.subscribe((params) => {
      const id = params["id"];
      if (id) {
        this.restaurantService.readOne(id, "restaurant").subscribe((restaurant) => {

          this.isUpdate = true;
          this.restaurantToUpdate = restaurant;
          this.createForm();
        });
      }
    });
  }

  private createForm() {
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

  get name() {
    return this.getField("name");
  }
  get chef() {
    return this.getField("chef");
  }

  get buttonSubmit() {
    return this.isUpdate ? "Update" : "Create";
  }

  get image() {
    //https://res.cloudinary.com/do7fhccn2/image/upload/v1673957583/epicure2/Epicure_2023-01-16_11_23/chefs/untitled-1_3x_1_lyvriu.png
    return this.getField("image");
  }
  get stars() {
    return this.getField("stars");
  }

  onSubmit() {
    console.log(this.form.value);
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

  onCloseClick() {
    this.close.emit();
  }

  private getField(field: string) {
    return this.form.get(field);
  }
}
