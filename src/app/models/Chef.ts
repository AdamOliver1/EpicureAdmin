import IModel from "./IModel";

export interface Chef extends IModel{
    image: string;
    description: string;
  }