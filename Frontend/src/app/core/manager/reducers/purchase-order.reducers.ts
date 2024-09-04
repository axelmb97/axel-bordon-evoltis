import { createReducer, on } from "@ngrx/store";
import * as PurchaseOrderActions from "../actions/purchase-orders.actions"
import { PurchaseOrdersState } from "../models/purchase-orders.state";
import { CreatePurchaseOrderModel } from "src/app/features/purchase-orders/data/models/create-purchase-order.model";
import { CreatePurchaseOrder } from "src/app/features/purchase-orders/domain/entities/create-purchase-order.entity";
import { PaginatedPurchaseOrderDetails } from "src/app/features/purchase-orders/domain/entities/paginated-purchase-order-details.entity";
import { CreatePurchaseOrderDetail } from "src/app/features/purchase-orders/domain/entities/create-purchase-order-detail.entity";
import { PurchaseOrderDetail } from "src/app/features/purchase-orders/domain/entities/purchase-order-detail.entity";
import { CreatePurchaseOrderDetailModel } from "src/app/features/purchase-orders/data/models/create-purchase-order-detail.model";
import { PurchaseOrder } from "src/app/features/purchase-orders/domain/entities/purchase-order.entity";

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
    return {...state, loading: false, purchasesPagination: prop.purchases}
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
  }),
  on(PurchaseOrderActions.deletePurchaseOrderDetail, (state, prop) => {
    let purchase = {...state.currentPurchase} as CreatePurchaseOrder;
    purchase.details = purchase.details?.filter(d => d.productId != prop.detail.productId);
    return {...state, currentPurchase: purchase}
  }),
  on(PurchaseOrderActions.cleanOrder, (state) => {
    return {...state, error: undefined, success: '', currentPurchase: undefined}
  }),
  on(PurchaseOrderActions.deletePurchase, (state) => {
    return {...state, loading:true}
  }),
  on(PurchaseOrderActions.loadPurchaseOrderDetails, (state, prop) => {
    let purchase = new CreatePurchaseOrderModel(
      prop.currentPurchase.supplier?.id,
      prop.currentPurchase.deliveryDate,
      [], prop.filters.purchaseOrderId); 
    
    return {...state, loading: true, currentPurchase: purchase}
  }),
  on(PurchaseOrderActions.loadedPurchaseOrderDetails, (state, prop) => {
    let details = mapPaginatedDetails(prop.details);
    let purchase = {...state.currentPurchase} as CreatePurchaseOrder;
    purchase.details = [...details];

    return {...state, loading: false, currentPurchase: purchase}
  }),
  on(PurchaseOrderActions.loadPurchaseOrderById, (state, prop) => {
    return {...state, loading: true}
  }),
  on(PurchaseOrderActions.loadedPurchaseOrderById, (state, prop) => {
   
    let purchase = getCreatePurchaseOrder(prop.purchase);
    return {...state, loading: false, currentPurchase : purchase}
  }),
  on(PurchaseOrderActions.updatePurchaseOrder, (state) => {
    return {...state, loading: true}
  }),
);

const mapPaginatedDetails = (pagination: PaginatedPurchaseOrderDetails) : CreatePurchaseOrderDetail[] => {
  let details : CreatePurchaseOrderDetail[] = [];

  for (const detail of pagination.items) {
    let detailForUpdate = mapPaginateDetail(detail);
    details.push(detailForUpdate);
  }

  return details;
}

const mapPaginateDetail = (detail: PurchaseOrderDetail) => {
  return new CreatePurchaseOrderDetailModel(
    detail.product.id,
    detail.quantity,
    detail.priceByUnit,
    detail.id
  );
}

const getCreatePurchaseOrder = (purchase: PurchaseOrder) : CreatePurchaseOrder => {
  let details = mapDetails(purchase.details!);
  return new CreatePurchaseOrderModel(
    purchase.supplier?.id,
    purchase.deliveryDate,
    details,
    purchase.id
  );
}

const mapDetails = (details: PurchaseOrderDetail[]) : CreatePurchaseOrderDetail[] => {
  let mapDetails : CreatePurchaseOrderDetail[] = [];

  for (const detail of details) {
    let detailForUpdate = mapDetail(detail);
    mapDetails.push(detailForUpdate);
  }

  return mapDetails;
}

const mapDetail = (detail: PurchaseOrderDetail) => {
  return new CreatePurchaseOrderDetailModel(
    detail.product.id,
    detail.quantity,
    detail.priceByUnit,
    detail.id
  );
}

