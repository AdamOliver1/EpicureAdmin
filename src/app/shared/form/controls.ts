import { FieldBase } from "./fieldBase";

export class TextboxField extends FieldBase<string> {
  override controlType = "textbox";
}


export class DropdownField extends FieldBase<{key:string,value:string}> {
  override controlType = "dropdown";
}

export class CheckBoxesField extends FieldBase<boolean> {
  override controlType = "checkbox";
}

export class listField extends FieldBase<string[]> {
  override controlType = "list";
}
