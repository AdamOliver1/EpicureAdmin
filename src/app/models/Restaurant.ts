import { Chef } from "./Chef";
import IModel from "./IModel";

export default interface Restaurant extends IModel {
    image: string;
    chef: Chef;
    stars:number;
  }
  