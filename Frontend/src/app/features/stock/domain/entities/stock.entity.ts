import { Entity } from "src/app/core/utils/entity";
import { Product } from "src/app/features/products/domain/entities/product.entity";

export abstract class Stock extends Entity {

  constructor(
    public quantity: number,
    public product: Product
  ){
    super();
  }
}