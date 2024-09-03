import { Failure } from "src/app/core/failures/failure";
import { Product } from "../entities/product.entity";

export abstract class ProductRepositoryBase {
  abstract getAll() : Promise<Product[] | Failure>;
}