import { PaginatedPurchaseOrders } from "src/app/features/purchase-orders/domain/entities/paginated-purchases.entity";
import { PurchaseOrderFilters } from "src/app/features/purchase-orders/domain/entities/purchase-order-filters.entity";
import { Failure } from "../../failures/failure";

export interface PurchaseOrdersState {
  loading: boolean;
  filters?: PurchaseOrderFilters;
  purchasesPagination?: PaginatedPurchaseOrders;
  error?: Failure;
  success: string;
}