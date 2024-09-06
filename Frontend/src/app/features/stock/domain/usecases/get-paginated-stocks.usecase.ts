import { Injectable } from "@angular/core";
import { UseCase } from "src/app/core/utils/usecase";
import { StockFilters } from "../entities/stock-filters.entity";
import { PaginatedStock } from "../entities/paginated-stock.entity";
import { Failure } from "src/app/core/failures/failure";
import { StockRepositoryBase } from "../repositories/stock-base.repository";

@Injectable()
export class GetPaginatedStocksUseCase implements UseCase<StockFilters, PaginatedStock> {

  constructor(private stockRepository: StockRepositoryBase){}

  execute(param: StockFilters): Promise<PaginatedStock | Failure> {
    return this.stockRepository.getPaginatedStocks(param);
  }
}