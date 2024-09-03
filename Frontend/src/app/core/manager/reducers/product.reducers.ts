import { createReducer, on } from "@ngrx/store";
import { ProductsState } from "../models/products.state";
import * as ProductActions from "../actions/products.actions"

export const initialState: ProductsState = {
  loading: false,
  products: []
}

export const productsReducers = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => {
    return {...state, loading: true};
  }),
  on(ProductActions.loadedProducts, (state, prop) => {
    return {...state, loading: false, products: prop.products }
  }),
  on(ProductActions.setProductError, (state, prop) => {
    return {...state, loading: false, error: prop.error}
  })
);