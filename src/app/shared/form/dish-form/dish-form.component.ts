import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import IDish from "src/app/models/Dish";
import Dish from "src/app/models/Dish";
import Restaurant from "src/app/models/Restaurant";
import { ApiService } from "src/app/services/apiService/api.service";

@Component({
  selector: "app-dish-form",
  templateUrl: "./dish-form.component.html",
  styleUrls: ["./dish-form.component.scss"],
})
export class DishFormComponent implements OnInit {
  private _dishToUpdate: Dish;
  private _isUpdate = false;

  protected isSubmitted = false;
  protected form: FormGroup;
  protected ingredientsArray: string[] = [];
  protected restaurants: { key: string; value: string }[] = [];

  @Output() close = new EventEmitter();
  @ViewChild("input") input: ElementRef;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dishService: ApiService<Dish>,
    private restaurantService: ApiService<Restaurant>
  ) {}

  ngOnInit(): void {
    this._initRestaurants();
    this._createForm();
    this._checkIfUpdate();
  }

  protected get buttonSubmit() {
    return this._isUpdate ? "Update" : "Create";
  }

  protected get name() {
    return this._getField("name");
  }
  protected get restaurant() {
    return this._getField("restaurant");
  }

  protected get image() {
    return this._getField("image");
  }
  protected get price() {
    return this._getField("price");
  }

  protected onIngredientAdd() {
    this.ingredientsArray.push(this.input.nativeElement.value);
    this.input.nativeElement.value = "";
    console.log(this.ingredientsArray);
  }

  protected onSubmit() {
    const { value } = this.form;
    value.ingredients = this.ingredientsArray;
    const tags = [];
    if (value.spicy) tags.push("spicy");
    if (value.vegan) tags.push("vegan");
    if (value.vegetarian) tags.push("vegetarian");
    value.tags = tags;

    const dish: IDish = {
      _id: value._id,
      name: value.name,
      image: value.image,
      price: value.price,
      ingredients: value.ingredients,
      restaurant: value.restaurant,
      tags: tags,
    };
    
    if (this._isUpdate) {
      this.dishService.update(dish, "dish").subscribe();
    } else {
      this.dishService.create(dish, "dish").subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err),
      });
    }
    this.isSubmitted = true;
  }

  protected onCloseClick() {
    this.close.emit();
  }

  protected onDeleteIngredientClicked(ingredient: any) {
    this.ingredientsArray = this.ingredientsArray.filter(
      (str) => str !== ingredient
    );
  }

  private _getField(field: string) {
    return this.form.get(field);
  }

  private _checkIfUpdate() {
    this.route.params.subscribe((params) => {
      const id = params["id"];
      if (id) {
        this.dishService.readOne(id, "dish").subscribe((dish) => {
          this.ingredientsArray = dish?.ingredients;

          this._isUpdate = true;
          this._dishToUpdate = dish;
          this._createForm();
        });
      }
    });
  }

  private _initRestaurants() {
    this.restaurantService.readAll("restaurant").subscribe((data) => {
      data.forEach((r) => {
        this.restaurants.push({ key: r._id, value: r.name });
      });
    });
  }

  private _createForm() {
    this.form = this.fb.group({
      _id: this._dishToUpdate?._id,
      name: [this._dishToUpdate?.name, Validators.required],
      image: [this._dishToUpdate?.image, Validators.required],
      price: [
        this._dishToUpdate?.price,
        [Validators.required, Validators.min(1)],
      ],
      ingredients: [this._dishToUpdate?.ingredients || []],
      spicy: [this._dishToUpdate?.tags?.includes("spicy") || false],
      vegan: [this._dishToUpdate?.tags?.includes("vegan") || false],
      vegetarian: [this._dishToUpdate?.tags?.includes("vegetarian") || false],
      restaurant: [this._dishToUpdate?.restaurant, Validators.required],
    });
  }
}
