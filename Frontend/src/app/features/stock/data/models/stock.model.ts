import { Product } from "src/app/features/products/domain/entities/product.entity";
import { Stock } from "../../domain/entities/stock.entity";
import { ProductModel } from "src/app/features/products/data/models/product.model";

export class StockModel extends Stock{

  override toJson(): Map<string, any> {
    throw new Error("Method not implemented.");
  }

  static fromJson(data:any) : Stock {
    let product =this.getMappedProduct(data.get('product'));
    return new StockModel(
      data.get('quantity'),
      product
    );
  }

  private static getMappedProduct(data:any) : Product {
    let map = new Map<string,any>(Object.entries(data));
    return ProductModel.fromJson(map);
  }
}