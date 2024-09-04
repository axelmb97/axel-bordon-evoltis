import { Pagination } from "src/app/core/utils/pagination";
import { PurchaseOrderDetail } from "./purchase-order-detail.entity";
import { Entity } from "src/app/core/utils/entity";

export abstract class PaginatedPurchaseOrderDetails extends Entity implements Pagination<PurchaseOrderDetail> {
  items: PurchaseOrderDetail[] = [];
  totalItems: number = 0;
  totalPages: number = 0;
  hasNextPage: boolean = false;
}