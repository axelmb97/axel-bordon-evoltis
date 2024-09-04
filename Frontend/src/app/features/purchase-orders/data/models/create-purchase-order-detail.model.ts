import { CreatePurchaseOrderDetail } from "../../domain/entities/create-purchase-order-detail.entity";

export class CreatePurchaseOrderDetailModel extends CreatePurchaseOrderDetail {
  
  override toJson(): Map<string, any> {
    let json = new Map<string,any>();
    json.set('quantity', this.quantity);
    json.set('product_id', this.productId);
    json.set('price_by_unit', this.priceByUnit);
    if (this.id) json.set("id", this.id);
    return json;
  }

  static fromJson(data:any) : CreatePurchaseOrderDetail {
    return new CreatePurchaseOrderDetailModel(
      data.get('product')['id'],
      data.get('quantity'),
      data.get('price_by_unit'),
      data.get('id'),
    );
  }
}