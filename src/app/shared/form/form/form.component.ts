import { FieldControlService } from "./../services/fieldControlService/field-control.service";
import { FieldBase } from "./../fieldBase";
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
// import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
// import { JsonFormControls, JsonFormData } from "../fieldBase";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter();
  @Output() submit = new EventEmitter();
  // @Output() submit = new Subject<any>();
  @Input() fields: FieldBase<string>[] | null = [];
  form!: FormGroup;
  success = false;

  constructor(private fieldControlService: FieldControlService) {}

  ngOnDestroy(): void {
    this.submit.unsubscribe();
  }

  ngOnInit() {
    this.form = this.fieldControlService.toFormGroup(
      this.fields as FieldBase<string>[]
    );
  }

  get fieldsCheckboxes() {
    return this.fields?.filter((f) => f.controlType === "checkbox");
  }
  get fieldsRegular() {
    return this.fields?.filter((f) => f.controlType !== "checkbox");
  }

  onSubmit() {
    debugger
    // this.payLoad = this.form.value;
    const { value } = this.form;
    console.log("onSubmit: ");
    // console.log(this.form.value);
    console.log(value);

    // this.submit.emit(value);

    this.success = true;
    console.log("this.success");
    console.log(this.success);
  }

  closeClick() {
    this.close.emit();
  }
}
