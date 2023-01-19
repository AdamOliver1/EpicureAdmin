import { FieldControlService } from './../services/fieldControlService/field-control.service';
import { FieldBase } from './../fieldBase';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
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

  @Input() fields: FieldBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private fieldControlService:FieldControlService) {}

  ngOnInit() {
    this.form = this.fieldControlService.toFormGroup(this.fields as FieldBase<string>[]);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}