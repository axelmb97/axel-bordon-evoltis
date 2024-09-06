import { Injectable } from "@angular/core";
import { StockRepositoryBase } from "../../domain/repositories/stock-base.repository";
import { Failure } from "src/app/core/failures/failure";
import { PaginatedStock } from "../../domain/entities/paginated-stock.entity";
import { StockFilters } from "../../domain/entities/stock-filters.entity";
import { StockRemoteDataSourceBase } from "../data-sources/stock-remote.datasource";
import { UnhandledFailure } from "src/app/core/failures/unhandled.failure";

@Injectable()
export class stockRepository extends StockRepositoryBase {

  constructor(private stockDataSource: StockRemoteDataSourceBase){
    super();
  }

  override async getPaginatedStocks(filters: StockFilters): Promise<PaginatedStock | Failure> {
    try {
      return await this.stockDataSource.getPaginatedStocks(filters);
    } catch (error:any) {
      console.log("ERROR", error);
      
      return new UnhandledFailure();
    }
  }

}