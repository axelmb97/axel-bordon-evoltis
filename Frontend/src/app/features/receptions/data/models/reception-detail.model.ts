import { Product } from "src/app/features/products/domain/entities/product.entity";
import { ReceptionDeatil } from "../../domain/entities/reception-detail.entity";
import { ProductModel } from "src/app/features/products/data/models/product.model";

export class ReceptionDetailModel extends ReceptionDeatil {

  override toJson(): Map<string, any> {
    throw new Error("Method not implemented.");
  }

  static fromJson(data:Map<string,any>) : ReceptionDeatil {
    let product = this.getMappedProduct(data.get("product"));
    return new ReceptionDetailModel(
      data.get("id"),
      data.get("quantity_recevied"),
      data.get("description"),
      product
    );
  }

  private static getMappedProduct(data:any) : Product {
    let map = new Map<string,any>(Object.entries(data));
    return ProductModel.fromJson(map);
  }
}