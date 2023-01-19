import { FieldBase } from './../../fieldBase';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FieldControlService {
  getValidators(field: FieldBase<string>){
    const validators = []
    if(field.required) validators.push(Validators.required);
    if(field.maxNumber) validators.push(Validators.max(field.maxNumber));
    if(field.minNumber) validators.push(Validators.max(field.minNumber));
    return validators;
}


  toFormGroup(fields: FieldBase<string>[] ) {
    const group: any = {};

    fields.forEach(field => {
      group[field.key] =  new FormControl(field.value || '',this.getValidators(field));
     
    });
    return new FormGroup(group);
  }
}
