import { FieldBase } from './../fieldBase';
import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss']
})
export class DynamicFormFieldComponent {
  @Input() field: FieldBase<string>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.field.key].valid; }
  inputText:string;
  isFirst = true;

  constructor(){
    console.log(this.form);
  }

  onInputChange(){
    console.log("sfsfsfsdfsdfsdfsd");
    
    this.isFirst = false;
    // return this.inputText.length > 0
  }
 
}
