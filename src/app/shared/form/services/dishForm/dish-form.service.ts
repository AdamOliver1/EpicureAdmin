import { CheckBoxesField as CheckBoxesField, listField } from "./../../controls";
import { Injectable } from "@angular/core";
import { FieldBase } from "../../fieldBase";
import { DropdownField, TextboxField } from "../../controls";
import Dish from "src/app/models/Dish";
import Restaurant from "src/app/models/Restaurant";
import { of, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DishFormService {

  EditDishEmitter = new Subject<any>();

  getFields(restaurants: Restaurant[], dish?: Dish) {
    console.log("dish:: ");
    console.log(dish?.restaurant);
    
    const questions: FieldBase<string | boolean | string[]| number |{key:string,value:string} >[] = [
      new DropdownField({
        key: "restaurant",
        label: "Restaurant",
        required: true,
        options: restaurants?.map((restaurant) => {
          return { key: restaurant._id, value: restaurant.name };
        }),
        value: dish ? {key: dish.restaurant._id,value:dish?.restaurant.name} : undefined,
        order: 10,
      }),

      new TextboxField({
        key: "name",
        label: "Name",
        value: dish?.name ?? "",
        required: true,
        order: 1,
      }),

      new TextboxField({
        key: "price",
        label: "Price",
        type: "number",
        value: dish?.price.toString(),
        required: true,
        minNumber: 1,
        // maxNumber: 100000,
        order: 2,
      }),
   
      new TextboxField({
        key: "image",
        label: "image",
        value: dish?.image.toString(),
        required: true,
        order: 3,
      }),

      new CheckBoxesField({
        key: "spicy",
        label: "spicy",
        order: 4,
        value:false,
        
      }),
      new CheckBoxesField({
        key: "vegan",
        label: "vegan",
        order: 5,
        value:false,
        
      }),
      new CheckBoxesField({
        key: "vegetarian",
        label: "vegetarian",
        order: 6,
        value:false,
        
      }),
      new listField({
        key: "ingredients",
        label: "ingredients",
        isFormGroup:true,
        order: 6,
        value:dish?.ingredients ?? [],
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
