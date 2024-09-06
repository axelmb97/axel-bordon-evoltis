import { StockFilters } from "../../domain/entities/stock-filters.entity";

export class StockFiltersModel extends StockFilters {
  override getPath(): string {
    let url = `?page=${this.page}&page_size=${this.pageSize}`;

    if(this.productName != undefined && this.productName.length > 0) {
      url += `&product_name=${this.productName}`
    }

    if (this.quantityGreaterThan != undefined) {
      url += `&quantity_greater_than=${this.quantityGreaterThan}`
    }

    if (this.quantityLessThan != undefined) {
      url += `&quantity_less_than=${this.quantityLessThan}`
    }
    return url;
  }
  override clone(): StockFilters {
    let filters = new StockFiltersModel();
    Object.assign(filters, this)
    return filters;
  }
  override toJson(): Map<string, any> {
    throw new Error("Method not implemented.");
  }

}