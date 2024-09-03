import { Entity } from "src/app/core/utils/entity";

export abstract class Supplier extends Entity {
  constructor(
    public id : number,
    public businessName: string,
    public address: string,
    public description: string
  ){
    super();
  }
  
}