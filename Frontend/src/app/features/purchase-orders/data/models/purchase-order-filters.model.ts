import { PurchaseOrderFilters } from "../../domain/entities/purchase-order-filters.entity";

export class PurchaseOrderFiltersModel extends PurchaseOrderFilters {
  override clone(): PurchaseOrderFilters {
    let filters = new PurchaseOrderFiltersModel();
    Object.assign(filters, this)
    return filters;
  }

  override getPath(): string {
    let path: string = `?page=${this.page!}&page_size=${this.pageSize!}`;

    if (this.businessName != undefined && this.businessName.length != 0) {
      path += `&business_name=${this.businessName}`
    }

    if (this.from && this.to) {
      path += `&from=${this.from.toISOString()}&to=${this.to.toISOString()}`;
    }
    
    if (this.from && !this.to) {
      path += `&from=${this.from.toISOString()}`;
    }
    
    if (this.to && !this.from) {
      path += `&to=${this.to.toISOString()}`;
    }

    return path;
  }
  
  override toJson(): Map<string, any> {
    throw new Error("Method not implemented.");
  }
}