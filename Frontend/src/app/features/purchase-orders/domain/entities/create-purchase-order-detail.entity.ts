import { Entity } from "src/app/core/utils/entity";

export abstract class CreatePurchaseOrderDetail extends Entity {

  constructor(
    public productId: number,
    public quantity: number,
    public priceByUnit: number,
    public id?: number
  ){
    super();
  }
}