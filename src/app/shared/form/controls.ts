import { FieldBase } from "./fieldBase";

export class TextboxQuestion extends FieldBase<string> {
  override controlType = 'textbox';
}


export class DropdownQuestion extends FieldBase<string> {
  override controlType = 'dropdown';
}