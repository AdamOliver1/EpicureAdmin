import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent {
  @Input() imageUrl: string;
  @Output() close = new EventEmitter();

  closeImageCard() {
      this.close.emit();
  }
}
