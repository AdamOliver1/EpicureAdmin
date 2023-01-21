import { FieldBase } from "./../../fieldBase";
import { Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class FieldControlService {
  getValidators(field: FieldBase<any>) {
    const validators = [];
    if (field.required) validators.push(Validators.required);
    if (field.maxNumber) validators.push(Validators.max(field.maxNumber));
    if (field.minNumber) validators.push(Validators.min(field.minNumber));
    return validators;
  }

  toFormGroup(fields: FieldBase<any>[]) {
    const group: any = {};

    fields.forEach((field) => {
    
        group[field.key] = new FormControl(
          field.value || "",
          Validators.compose(this.getValidators(field))
        );
     
    });
    return new FormGroup(group);
  }
}
