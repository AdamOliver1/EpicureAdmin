import { Component, EventEmitter, Output, Input } from "@angular/core";
import { RoleService } from "src/app/services/roleService/role.service";

@Component({
  selector: "app-button-create",
  templateUrl: "./create-button.component.html",
  styleUrls: ["./create-button.component.scss"],
})
export class ButtonComponent {
  @Output() buttonClick = new EventEmitter();
  @Input() disable: any;

constructor(public roleService:RoleService){

}

  emitEvent() {
    this.buttonClick.emit();
  }
}
