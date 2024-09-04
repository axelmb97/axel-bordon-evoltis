import { PurchaseOrderDetailFilters } from "../../domain/entities/purchase-order-deatil-filters.entoty";

export class PurchaseOrderDetailFiltersModel extends PurchaseOrderDetailFilters {

  override getPath(): string {
    return `?page=${this.page!}&page_size=${this.pageSize!}`;
  }
  
  override toJson(): Map<string, any> {
    throw new Error("Method not implemented.");
  }
}