import { SuppliersState } from "../models/suppliers.state";
import * as SupplierActions from "../actions/suppliers.actions"
import { createReducer, on } from "@ngrx/store";

export const initialState: SuppliersState = {
  loading: false,
  suppliers: []
}

export const suppliersReducers = createReducer(
  initialState,
  on(SupplierActions.laodSuppliers, (state) => {
    return {...state, loading: true};
  }),
  on(SupplierActions.loadedSuppliers, (state, prop) => {
    return {...state, loading: false, suppliers: prop.suppliers}
  }),
  on(SupplierActions.setSupplierError, (state, prop) => {
    return {...state, loading: false, error: prop.error}
  })
);
