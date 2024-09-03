import { Entity } from "src/app/core/utils/entity";

export abstract class Employee extends Entity {
  constructor(
    public id: number,
    public name: string,
    public lastname: string,
    public phoneNumber:string
  ){
    super();
  }
}