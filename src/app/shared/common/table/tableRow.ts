
export interface ITableRow {
  id:string;
    position: number;
    name: string;
    type:Type;
  }
export enum Type{
  Dish,
  Restaurant,
  Chef
}
export interface IDishRow extends ITableRow {
  price: number;
  ingredients?: string[];
  tags?: string[];
  restaurant: {key:string,value:string};
  image: string;
}


export interface IRestaurantRow extends ITableRow {
  chef: string;
  stars: number;
  image: string;
}


export interface IChefRow extends ITableRow {
  image: string;
  description: string;
}