import { Product } from "../../domain/entities/product.entity";

export class ProductModel extends Product {
  override toJson(): Map<string, any> {
    throw new Error("Method not implemented.");
  }

  static fromJson(data:Map<string,any>) : Product {
    return new ProductModel(
      data.get("id"),
      data.get("name"),
      data.get("description")
    );
  }
}