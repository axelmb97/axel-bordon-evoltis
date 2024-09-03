import { CreatePurchaseOrderDetail } from "../../domain/entities/create-purchase-order-detail.entity";

export class CreatePurchaseOrderDetailModel extends CreatePurchaseOrderDetail {
  
  override toJson(): Map<string, any> {
    let json = new Map<string,any>();
    json.set('quantity', this.quantity);
    json.set('product_id', this.productId);
    json.set('price_by_unit', this.priceByUnit);
    return json;
  }

}