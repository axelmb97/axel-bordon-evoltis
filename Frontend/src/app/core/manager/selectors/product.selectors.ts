import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ProductsState } from "../models/products.state";

export const selectProductsFeature = (app: AppState) => app.products;

export const selectIsProductsLoading = createSelector(
  selectProductsFeature,
  (state:ProductsState) => state.loading
);

export const selectProducts = createSelector(
  selectProductsFeature,
  (state:ProductsState) => state.products
);

export const selectProductsError = createSelector(
  selectProductsFeature,
  (state:ProductsState) => state.error
);