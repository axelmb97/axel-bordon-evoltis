import { Entity } from "src/app/core/utils/entity";

export abstract class Product extends Entity {
  constructor(
    public id:number,
    public name:string,
    public description:string,
  ){
    super();
  }
}