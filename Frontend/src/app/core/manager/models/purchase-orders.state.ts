import { PaginatedPurchaseOrders } from "src/app/features/purchase-orders/domain/entities/paginated-purchases.entity";
import { PurchaseOrderFilters } from "src/app/features/purchase-orders/domain/entities/purchase-order-filters.entity";
import { Failure } from "../../failures/failure";
import { PurchaseOrder } from "src/app/features/purchase-orders/domain/entities/purchase-order.entity";
import { CreatePurchaseOrder } from "src/app/features/purchase-orders/domain/entities/create-purchase-order.entity";

export interface PurchaseOrdersState {
  loading: boolean;
  filters?: PurchaseOrderFilters;
  purchasesPagination?: PaginatedPurchaseOrders;
  currentPurchase?: CreatePurchaseOrder;
  error?: Failure;
  success: string;
}