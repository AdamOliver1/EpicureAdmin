
export interface ITableRow {
    position: number;
    name: string;
  }

export interface IDishRow extends ITableRow {
  price: number;
  ingredients?: string[];
  tags?: string[];
  restaurant: string;
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