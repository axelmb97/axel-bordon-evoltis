import { Failure } from "src/app/core/failures/failure";
import { PaginatedStock } from "../entities/paginated-stock.entity";
import { StockFilters } from "../entities/stock-filters.entity";

export abstract class StockRepositoryBase {
  abstract getPaginatedStocks(filters: StockFilters) : Promise<PaginatedStock | Failure>;
}