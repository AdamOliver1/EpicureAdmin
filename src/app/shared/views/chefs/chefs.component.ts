import { ChefService } from './../../../services/chefService/chef.service';
import { DishService } from './../../../services/dishService/dish.service';
import { Component, Output } from '@angular/core';
import { ITableRow } from '../../common/table/tableRow';
import { Chef } from 'src/app/models/Chef';


export interface IChefRow extends ITableRow{
  image: string;
  description: string;
}

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.scss']
})
export class ChefsComponent {
  headers = ["position","name","image","description"]
  @Output() dataSource:IChefRow[] = []
   constructor(private chefService:ChefService) {
   
   }
   ngOnInit(): void {
     this.chefService.readAll().subscribe((data:Chef[]) => {
       
       this.dataSource = []; 
       data.forEach((chef,i) => {
         this.dataSource.push({
           position:i + 1,
           name:chef.name,
           image:chef.image,
           description:chef.description
         })
       });
       console.log(this.dataSource);
     });
   }
}
