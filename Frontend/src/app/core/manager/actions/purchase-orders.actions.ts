import { createAction, props } from "@ngrx/store";
import { PurchaseOrderActionName } from "./purchase-order-action-names";
import { PaginatedPurchaseOrders } from "src/app/features/purchase-orders/domain/entities/paginated-purchases.entity";
import { PurchaseOrderFilters } from "src/app/features/purchase-orders/domain/entities/purchase-order-filters.entity";
import { CreatePurchaseOrder } from "src/app/features/purchase-orders/domain/entities/create-purchase-order.entity";
import { Failure } from "../../failures/failure";
import { PurchaseOrderDetail } from "src/app/features/purchase-orders/domain/entities/purchase-order-detail.entity";
import { CreatePurchaseOrderDetailModel } from "src/app/features/purchase-orders/data/models/create-purchase-order-detail.model";
import { CreatePurchaseOrderDetail } from "src/app/features/purchase-orders/domain/entities/create-purchase-order-detail.entity";

export const loadPurchaseOrders = createAction(
  PurchaseOrderActionName.LOAD_PAGINATED_PURCHASES,
  props<{filters: PurchaseOrderFilters}>()
);

export const loadedPurchaseOrders = createAction(
  PurchaseOrderActionName.LOADED_PAGINATED_PURCHASES,
  props<{purchases: PaginatedPurchaseOrders}>()
);

export const createPurchaseOrder = createAction(
  PurchaseOrderActionName.CREATE_PURCHASE_ORDER,
  props<{purchaseOrder: CreatePurchaseOrder}>()
);

export const setPurchaseOrderError = createAction(
  PurchaseOrderActionName.SET_ERROR,
  props<{error: Failure}>()
);

export const setPurchaseOrderSuccess = createAction(
  PurchaseOrderActionName.SET_SUCCESS,
  props<{message: string}>()
);

export const addPurchaseGeneralData = createAction(
  PurchaseOrderActionName.ADD_GENERAL_DATA,
  props<{supplierId: number, deliveryDate: string}>()
);

export const addPurchaseOrderDetail = createAction(
  PurchaseOrderActionName.ADD_PURCHASE_DEETAIL,
  props<{detail: CreatePurchaseOrderDetail}>()
);

export const cleanOrder = createAction(
  PurchaseOrderActionName.CLEAN_ORDER
);