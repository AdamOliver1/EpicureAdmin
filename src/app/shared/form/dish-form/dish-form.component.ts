import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import Dish from "src/app/models/Dish";
import Restaurant from "src/app/models/Restaurant";
import { ApiService } from "src/app/services/apiService/api.service";

@Component({
  selector: "app-dish-form",
  templateUrl: "./dish-form.component.html",
  styleUrls: ["./dish-form.component.scss"],
})
export class DishFormComponent implements OnInit {
  isSubmitted = false;
  isUpdate = false;
  dishToUpdate: Dish;
  form: FormGroup;
  ingredientsArray: string[] = [];
  @Output() close = new EventEmitter();
  @ViewChild('input')input:ElementRef;
  restaurants: { key: string; value: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dishService: ApiService<Dish>,
    private restaurantService: ApiService<Restaurant>
  ) {}

  ngOnInit(): void {
    this.restaurantService.readAll("restaurant").subscribe((data) => {
      data.forEach((r) => {
        this.restaurants.push({ key: r._id, value: r.name });
      });
    });

    this._createForm();
    this.route.params.subscribe((params) => {
      const id = params["id"];
      if (id) {
        this.dishService.readOne(id, "dish").subscribe((dish) => {
      this.ingredientsArray = dish?.ingredients;

          this.isUpdate = true;
          this.dishToUpdate = dish;
          this._createForm();
        });
      }
    });
  }

 

  private _createForm() {
    this.form = this.fb.group({
      _id: this.dishToUpdate?._id,
      name: [this.dishToUpdate?.name, Validators.required],
      image: [this.dishToUpdate?.image, Validators.required],
      price: [
        this.dishToUpdate?.price,
        [Validators.required, Validators.min(1)],
      ],
      ingredients: [this.dishToUpdate?.ingredients || []],
      spicy: [this.dishToUpdate?.tags?.includes("spicy") || false],
      vegan: [this.dishToUpdate?.tags?.includes("vegan") || false],
      vegetarian: [this.dishToUpdate?.tags?.includes("vegetarian") || false],
      restaurant: [this.dishToUpdate?.restaurant, Validators.required],
    });
  }

  get buttonSubmit() {
    return this.isUpdate ? "Update" : "Create";
  }

  get name() {
    return this._getField("name");
  }
  get restaurant() {
    return this._getField("restaurant");
  }

  get image() {
    //https://res.cloudinary.com/do7fhccn2/image/upload/v1673957583/epicure2/Epicure_2023-01-16_11_23/chefs/untitled-1_3x_1_lyvriu.png
    return this._getField("image");
  }
  get price() {
    return this._getField("price");
  }

  onIngredientAdd() {
    this.ingredientsArray.push(this.input.nativeElement.value);
    this.input.nativeElement.value = "";
    console.log(this.ingredientsArray);
  }

  onSubmit() {
    console.log(this.form.value);
    const {value} = this.form;
    value.ingredients = this.ingredientsArray;
   const tags = [];
   if(value.spicy) tags.push("spicy");
   if(value.vegan) tags.push("vegan");
   if(value.vegetarian) tags.push("vegetarian");
   value.tags = tags;
   
    if (this.isUpdate) {
      this.dishService.update(value, "dish").subscribe();
    } else {
      this.dishService.create(value, "dish").subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err),
      });
    }
    this.isSubmitted = true;
  }

  onCloseClick() {
    this.close.emit();
  }
 
  onDeleteIngredientClicked(ingredient:any){
    this.ingredientsArray = this.ingredientsArray.filter(str => str !== ingredient);
  }

  private _getField(field: string) {
    return this.form.get(field);
  }
}
