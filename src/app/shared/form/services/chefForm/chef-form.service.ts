import { Chef } from "../../../../models/Chef";
import { Injectable } from "@angular/core";
import { FieldBase } from "../../fieldBase";
import { DropdownField, TextboxField } from "../../controls";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ChefFormService {
  getFields(chef?: Chef) {
    const questions: FieldBase<string>[] = [
      new TextboxField({
        key: "name",
        label: "Name",
        value: chef?.name ?? "",
        required: true,
        order: 1,
      }),

      new TextboxField({
        key: "image",
        label: "image",
        value: chef?.image ?? "",
        required: true,
      }),

      new TextboxField({
        key: "description",
        label: "description",
        value: chef?.description ?? "",
        required: true,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
