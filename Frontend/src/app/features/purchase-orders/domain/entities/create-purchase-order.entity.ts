import { Entity } from "src/app/core/utils/entity";
import { CreatePurchaseOrderDetail } from "./create-purchase-order-detail.entity";


export abstract class CreatePurchaseOrder extends Entity {

  constructor(
    public supplierId?: number,
    public deliveryDate?: string,
    public details?: CreatePurchaseOrderDetail[]
  ){
    super();
  }
}