import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ITableRow } from './tableRow';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {

    if(this.headers.includes("ingredients")){
     this.selectedOption = this.dataSource[0]?.ingredients[0];
     console.log(this.dataSource[0]);
     
    }
    
  }
  @Input()dataSource:any[];
  @Input() headers: string[];
  showImageCard = false;
  imageUrl: string;
  spicyUrl = '../../../../assets/dishesIcons/spicy.svg';
  veganUrl = '../../../../assets/dishesIcons/vegan.svg';
  vegetarianUrl = '../../../../assets/dishesIcons/vegetarian.svg';

  selectedOption:string = "open to see"
  openImageCard(url: string) {
    console.log("sdfsfsfsd");
    
    this.showImageCard = true;
    this.imageUrl = url;
  }
  closeImageCard() {
    this.showImageCard = false;
  }
}
