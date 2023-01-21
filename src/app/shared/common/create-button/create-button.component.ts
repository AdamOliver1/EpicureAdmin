import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.scss']
})
export class CreateButtonComponent {
  @Output() buttonClick = new EventEmitter();
  @Input() label:string;
  @Input() disable:any;

  emitEvent() {
    this.buttonClick.emit(); 
  }
}
