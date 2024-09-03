import { Injectable } from "@angular/core";
import { NoParams } from "src/app/core/utils/no-params";
import { Product } from "../entities/product.entity";
import { UseCase } from "src/app/core/utils/usecase";
import { Failure } from "src/app/core/failures/failure";
import { ProductRepositoryBase } from "../repositories/product-base.repository";

@Injectable()
export class GetAllProductsUseCase implements UseCase<NoParams, Product[]>{

  constructor(private productRepository: ProductRepositoryBase){}

  execute(param: NoParams): Promise<Product[] | Failure> {
    return this.productRepository.getAll();
  }
}