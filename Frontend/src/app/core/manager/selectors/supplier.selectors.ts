import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { SuppliersState } from "../models/suppliers.state";

export const selectSupplierFeature = (app:AppState) => app.suppliers;

export const selectIsSuppliersLoading = createSelector(
  selectSupplierFeature,
  (state: SuppliersState) => state.loading
);

export const selectSuppliers = createSelector(
  selectSupplierFeature,
  (state: SuppliersState) => state.suppliers
);

export const selectSuppliersError = createSelector(
  selectSupplierFeature,
  (state: SuppliersState) => state.error
);