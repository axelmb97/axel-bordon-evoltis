import { createReducer, on } from "@ngrx/store";
import * as PurchaseOrderActions from "../actions/purchase-orders.actions"
import { PurchaseOrdersState } from "../models/purchase-orders.state";
import { PurchaseOrderModel } from "src/app/features/purchase-orders/data/models/purchase-order.model";
import { CreatePurchaseOrderModel } from "src/app/features/purchase-orders/data/models/create-purchase-order.model";
import { CreatePurchaseOrder } from "src/app/features/purchase-orders/domain/entities/create-purchase-order.entity";

export const initialState: PurchaseOrdersState = {
  loading: false,
  filters: undefined,
  purchasesPagination: undefined,
  currentPurchase: undefined,
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
  }),
  on(PurchaseOrderActions.addPurchaseGeneralData, (state, prop) => {
    let purchase = state.currentPurchase;
    if (!purchase) {
      purchase = new CreatePurchaseOrderModel();
    } else {
      purchase = {...purchase} as CreatePurchaseOrder;
    }
    
    purchase.supplierId = prop.supplierId;
    purchase.deliveryDate = prop.deliveryDate;

    return {...state, currentPurchase: purchase }
  }),
  on(PurchaseOrderActions.addPurchaseOrderDetail, (state, prop) => {
    let purchase = state.currentPurchase;
    
    if (!purchase) {
      purchase = new CreatePurchaseOrderModel(0,undefined,[]); 
    } else {
      purchase = {...purchase} as CreatePurchaseOrder;
      if (!purchase.details) purchase.details = [];
    }

    purchase.details = [...purchase.details!, prop.detail];
    
    return {...state, currentPurchase: purchase}
  })
);