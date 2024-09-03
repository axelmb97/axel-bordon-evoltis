import { Entity } from "src/app/core/utils/entity";
import { Product } from "src/app/features/products/domain/entities/product.entity";

export abstract class PurchaseOrderDetail extends Entity {

  constructor(
    public id:number,
    public quantity:number,
    public priceByUnit:number,
    public product: Product
  ){
    super();
  }
}