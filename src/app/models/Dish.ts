import IModel from "./IModel";
import Restaurant from "./Restaurant";
import { Tags } from "./Tags";

export default interface IDish extends IModel {
    price: number;
    ingredients?: string[];
    tags?: string[];
    restaurant: Restaurant;
    image:string;
  }
  