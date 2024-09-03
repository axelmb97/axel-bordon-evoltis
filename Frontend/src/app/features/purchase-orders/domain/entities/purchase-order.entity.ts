import { Entity } from "src/app/core/utils/entity";
import { Pagination } from "src/app/core/utils/pagination";
import { PurchaseOrderDetail } from "src/app/features/purchase-orders/domain/entities/purchase-order-detail.entity";
import { Supplier } from "src/app/features/suppliers/domain/entities/supplier.entity";

export abstract class PurchaseOrder extends Entity {

  constructor(
    public id: number,
    public supplier: Supplier,
    public deliveryDate: Date,
    public details: PurchaseOrderDetail[]
  ){
    super();
  }
}