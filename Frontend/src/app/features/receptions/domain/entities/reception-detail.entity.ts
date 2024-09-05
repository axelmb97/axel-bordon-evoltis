import { Entity } from "src/app/core/utils/entity";
import { Product } from "src/app/features/products/domain/entities/product.entity";

export abstract class ReceptionDeatil extends Entity {

  constructor(
    public id:string,
    public quantityReceived: number,
    public descrpition: string,
    public product: Product
  ){
    super();

  }
}