import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { PurchaseOrdersState } from "../models/purchase-orders.state";

export const selectPurchaseOrderFeature = (app: AppState) => app.purchases;

export const selectIsPurchaseOrderLoading = createSelector(
  selectPurchaseOrderFeature,
  (state: PurchaseOrdersState) => state.loading
);

export const selectPaginatedPurchaseOrders = createSelector(
  selectPurchaseOrderFeature,
  (state: PurchaseOrdersState) => state.purchasesPagination
);

export const selectPurchaseOrderError = createSelector(
  selectPurchaseOrderFeature,
  (state: PurchaseOrdersState) => state.error
);

export const selectPurchaseOrderSuccess = createSelector(
  selectPurchaseOrderFeature,
  (state:PurchaseOrdersState) => state.success
);

export const selectCurrentPurchaseOrder = createSelector(
  selectPurchaseOrderFeature,
  (state: PurchaseOrdersState) => state.currentPurchase
);

export const selectPurchaseOrderFilters = createSelector(
  selectPurchaseOrderFeature,
  (state: PurchaseOrdersState) => state.filters
);