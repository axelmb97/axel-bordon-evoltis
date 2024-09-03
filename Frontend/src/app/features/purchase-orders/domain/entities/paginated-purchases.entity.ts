import { Pagination } from "src/app/core/utils/pagination";
import { PurchaseOrder } from "./purchase-order.entity";
import { PurchaseOrderModel } from "../../data/models/purchase-order.model";
import { Entity } from "src/app/core/utils/entity";

export abstract class PaginatedPurchaseOrders extends Entity implements Pagination<PurchaseOrder> {
  items: PurchaseOrder[] = [];
  totalItems: number = 0;
  totalPages: number = 0;
  hasNextPage: boolean = false;
}