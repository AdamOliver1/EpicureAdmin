import { Chef } from './../../../../models/Chef';
import { FieldBase } from "../../fieldBase";
import { Injectable } from "@angular/core";
import { DropdownQuestion, TextboxQuestion } from "../../controls";
import { of } from "rxjs";
import Restaurant from "src/app/models/Restaurant";

@Injectable({
  providedIn: "root",
})
export class RestaurantFormService {
  constructor() {}

  getFields(chefs:Chef[],restaurant?:Restaurant) {
    const questions: FieldBase<string>[] = [
      new DropdownQuestion({
        key: "chef",
        label: "Chef",
        options: chefs?.map((chef) => {
return { key: chef._id, value: chef.name }
        }) ,
        order: 3,
      }),

      new TextboxQuestion({
        key: "name",
        label: "Name",
        value: restaurant?.name ?? "",
        required: true,
        order: 1,
      }),

      new TextboxQuestion({
        key: "stars",
        label: "Stars",
        type: "number",
        value:restaurant?.stars.toString() ?? '0',
        required: true,
        minNumber:0,
        maxNumber:5
        
      }),
      new TextboxQuestion({
        key: "image",
        label: "image",
        type: "type",
        required: true,
        
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
