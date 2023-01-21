import { FieldBase } from "./../fieldBase";
import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-dynamic-form-field",
  templateUrl: "./dynamic-form-field.component.html",
  styleUrls: ["./dynamic-form-field.component.scss"],
})
export class DynamicFormFieldComponent {
  @Input() field: FieldBase<any>;
  @Input() form: FormGroup;
  @ViewChild("myInput") input: ElementRef;
  inputText: string;
  isFirst = true;
  listInput: string;
  // selectedIngredient:String;
  constructor() {}

  onInputChange() {
    this.isFirst = false;
  }
  onSelectClicked(){
    const ingredients = this.form.controls["ingredients"];
    const ingredientsArray = ingredients.value as string[] ;
    if(ingredientsArray.length === 1){
      ingredients.setValue([]);
    }
  }
  addIngredient() {
    const ingredients = this.form.controls["ingredients"];
    ingredients.setValue([
      ...ingredients.value,
      this.input.nativeElement.value,
    ]);
    this.input.nativeElement.value = "";
  }

  get getIngredients() {
    return this.form.controls["ingredients"].value;
  }

  onListInputChange(event: any) {
    console.log(this.listInput);
  }


  onOptionClicked(event: any) {
    const ingredientToRemove = event.target.value;
    const ingredients = this.form.controls["ingredients"];
    const ingredientsArray = ingredients.value as string[] ;
    // console.log(ingredientsArray);
    // console.log(ingredientsArray.indexOf(ingredientToRemove));
    
    ingredientsArray.splice(ingredientsArray.indexOf(ingredientToRemove),1)
    ingredients.setValue([...ingredients.value])
    // console.log(ingredientsArray);
    // console.log(this.form.controls["ingredients"]);
  }

  private checkIfNotValid(name: string) {
    return (
      this.form.controls[this.field.key].hasError(name) &&
      this.form.controls[this.field.key].touched
    );
  }

  get checkIfNotValidRequired() {
    return this.checkIfNotValid("required");
  }

  get isNotCheckbox() {
    return this.field.controlType !== "checkbox";
  }

  get checkIfNotValidMin() {
    return this.checkIfNotValid("min");
  }
  get checkIfNotValidMax() {
    return this.checkIfNotValid("max");
  }
}
