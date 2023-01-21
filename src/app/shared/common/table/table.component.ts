import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ITableRow } from './tableRow';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent  {
 
  @Input()dataSource:any[];
  @Input() headers: string[];
  showImageCard = false;
  imageUrl: string;
  spicyUrl = '../../../../assets/dishesIcons/spicy.svg';
  veganUrl = '../../../../assets/dishesIcons/vegan.svg';
  vegetarianUrl = '../../../../assets/dishesIcons/vegetarian.svg';
  selectedOption: string;

  openImageCard(url: string) {
    this.showImageCard = true;
    this.imageUrl = url;
  }

  closeImageCard() {
    this.showImageCard = false;
  }
}
