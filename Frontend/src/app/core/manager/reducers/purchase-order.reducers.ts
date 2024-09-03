import { createReducer, on } from "@ngrx/store";
import * as PurchaseOrderActions from "../actions/purchase-orders.actions"
import { PurchaseOrdersState } from "../models/purchase-orders.state";

export const initialState: PurchaseOrdersState = {
  loading: false,
  filters: undefined,
  purchasesPagination: undefined,
  error: undefined,
  success: ''
}

export const purchaseOrderReducers = createReducer(
  initialState,
  on(PurchaseOrderActions.loadPurchaseOrders, (state, prop) => {
    return {...state, loading: true, filters: prop.filters}
  }),
  on(PurchaseOrderActions.loadedPurchaseOrders, (state, prop) => {
    return {...state, loading: true, purchasesPagination: prop.purchases}
  }),
  on(PurchaseOrderActions.createPurchaseOrder, (state) => {
    return {...state, loading: true}
  }),
  on(PurchaseOrderActions.setPurchaseOrderError, (state, prop) => {
    return {...state, loading: false, error: prop.error}
  }),
  on(PurchaseOrderActions.setPurchaseOrderSuccess, (state, prop) => {
    return {...state, loading: false, success: prop.message}
  })
);