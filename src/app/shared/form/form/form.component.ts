import { FieldControlService } from './../services/fieldControlService/field-control.service';
import { FieldBase } from './../fieldBase';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from "@angular/core";
// import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// import { JsonFormControls, JsonFormData } from "../fieldBase";


@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Output() submit = new EventEmitter<any>();
  @Input() fields: FieldBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private fieldControlService:FieldControlService) {}

  ngOnInit() {
    this.form = this.fieldControlService.toFormGroup(this.fields as FieldBase<string>[]);
  }

  onSubmit() {
    this.payLoad = this.form.getRawValue();
    console.log("onSubmit: ");
    
    this.submit.emit(this.payLoad);
  }

  get fieldsCheckboxes(){return this.fields?.filter((f) => f.controlType === 'checkbox')}
  get fieldsRegular(){return this.fields?.filter((f) => f.controlType !== 'checkbox')}

  closeClick(){
    this.close.emit();
  }
}