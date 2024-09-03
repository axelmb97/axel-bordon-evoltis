import { Product } from "src/app/features/products/domain/entities/product.entity";
import { PurchaseOrderDetail } from "../../domain/entities/purchase-order-detail.entity";
import { ProductModel } from "src/app/features/products/data/models/product.model";

export class PurchaseOrderDetailModel extends PurchaseOrderDetail {
  override toJson(): Map<string, any> {
    throw new Error("Method not implemented.");
  }

  static fromJson(data:Map<string,any>) : PurchaseOrderDetail {
    let product = this.getMappedProduct(data.get("product"));
    return new PurchaseOrderDetailModel(
      data.get("id"),
      data.get("quantity"),
      data.get("price_by_unit"),
      product
    );
  }

  private static getMappedProduct(data:any) : Product {
    let map = new Map<string,any>(Object.entries(data));
    return ProductModel.fromJson(map);
  }
}