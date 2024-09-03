import { CreatePurchaseOrder } from "../../domain/entities/create-purchase-order.entity";

export class CreatePurchaseOrderModel extends CreatePurchaseOrder {
  override toJson(): Map<string, any> {
    let json = new Map<string,any>();
    json.set("supplier_id", this.supplierId);
    json.set("delivery_date", this.deliveryDate);
    json.set("details", this.details.forEach(d => d.toJson()));

    return json;
  }
}