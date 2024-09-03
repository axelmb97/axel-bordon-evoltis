import { Product } from "../../../features/products/domain/entities/product.entity";
import { Failure } from "../../failures/failure";

export interface ProductsState {
  loading: boolean;
  products: Product[];
  error?: Failure;
}