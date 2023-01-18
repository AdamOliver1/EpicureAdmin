import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.scss']
})
export class CreateButtonComponent {
  @Output() buttonClick = new EventEmitter();

  emitEvent() {
    this.buttonClick.emit(); 
  }
}
