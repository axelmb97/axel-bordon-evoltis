import { Injectable } from "@angular/core";
import { Product } from "../../domain/entities/product.entity";
import { environment } from "src/environments/environment.development";
import { HttpServiceBase } from "src/app/core/services/http-service.base";
import { ProductModel } from "../models/product.model";

export abstract class ProductRemoteDataSourceBase {
  abstract getAll() : Promise<Product[]>;
}

@Injectable()
export class ProductRemoteDataSource extends ProductRemoteDataSourceBase {
  private url: string = `${environment.apiUrl}/api/products`;
  
  constructor(private httpService: HttpServiceBase){
    super();
  }

  override async getAll(): Promise<Product[]> {
    let result = await this.httpService.get(this.url);
    return this.getMappedProducts(result.get("response"));
  }

  private getMappedProducts(data:any) : Product[] {
    let products: Product[] = [];

    for (const product of data) {
      let productMap = new Map<string,any>(Object.entries(product));
      let productModel = ProductModel.fromJson(productMap);
      products.push(productModel);
    }

    return products;
  }
}