import { Failure } from "src/app/core/failures/failure";
import { PaginatedPurchaseOrders } from "../entities/paginated-purchases.entity";
import { PurchaseOrderFilters } from "../entities/purchase-order-filters.entity";
import { CreatePurchaseOrder } from "../entities/create-purchase-order.entity";
import { PaginatedPurchaseOrderDetails } from "../entities/paginated-purchase-order-details.entity";
import { PurchaseOrderDetailFilters } from "../entities/purchase-order-deatil-filters.entoty";

export abstract class PurchaseOrderRepositoryBase {
  abstract getPaginatedPurchaseOrders(filters: PurchaseOrderFilters): Promise<PaginatedPurchaseOrders | Failure>;

  abstract createPurchaseOrder(purchaseOrder: CreatePurchaseOrder): Promise<boolean | Failure>;
  abstract deletePurchaseOrder(purchaseOrderId: number): Promise<boolean | Failure>;
  abstract getPaginatedPurchaseOrderDetails(filters:PurchaseOrderDetailFilters): Promise<PaginatedPurchaseOrderDetails | Failure>;
}