import { PaginatedStock } from "src/app/features/stock/domain/entities/paginated-stock.entity";
import { StockFilters } from "src/app/features/stock/domain/entities/stock-filters.entity";
import { Failure } from "../../failures/failure";

export interface SotcksState {
  loading: boolean;
  filters?: StockFilters;
  stockPagination?: PaginatedStock;
  error?: Failure;
  success: string;
}