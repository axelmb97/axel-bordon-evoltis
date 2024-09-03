import { Injectable } from "@angular/core";
import { ProductRepositoryBase } from "../../domain/repositories/product-base.repository";
import { ProductRemoteDataSourceBase } from "../data-sources/product-remote.datasource";
import { Failure } from "src/app/core/failures/failure";
import { Product } from "../../domain/entities/product.entity";
import { UnhandledFailure } from "src/app/core/failures/unhandled.failure";

@Injectable()
export class ProductRepository extends ProductRepositoryBase {


  constructor(private productRemoteDataSource: ProductRemoteDataSourceBase){
    super();
  }

  override async getAll(): Promise<Product[] | Failure> {
    try {
      return await this.productRemoteDataSource.getAll();
    } catch (error:any) {
      return new UnhandledFailure();
    }
  }
}