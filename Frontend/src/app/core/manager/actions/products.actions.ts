import { createAction, props } from "@ngrx/store";
import { ProductActionName } from "./product-action-name";
import { Product } from "src/app/features/products/domain/entities/product.entity";
import { Failure } from "../../failures/failure";

export const loadProducts = createAction(
  ProductActionName.LOAD_PRODUCTS
);

export const loadedProducts = createAction(
  ProductActionName.LOADED_PRODUCTS,
  props<{products: Product[]}>()
);

export const setProductError = createAction(
  ProductActionName.SET_ERROR,
  props<{error: Failure}>()
);