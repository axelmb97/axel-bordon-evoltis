import { Injectable } from "@angular/core";
import { StockRepositoryBase } from "../../domain/repositories/stock-base.repository";
import { Failure } from "src/app/core/failures/failure";
import { PaginatedStock } from "../../domain/entities/paginated-stock.entity";
import { StockFilters } from "../../domain/entities/stock-filters.entity";
import { StockRemoteDataSourceBase } from "../data-sources/stock-remote.datasource";
import { UnhandledFailure } from "src/app/core/failures/unhandled.failure";
import { BadRequestFailure } from "src/app/core/failures/bad-request.failure";

@Injectable()
export class stockRepository extends StockRepositoryBase {

  constructor(private stockDataSource: StockRemoteDataSourceBase){
    super();
  }

  override async getPaginatedStocks(filters: StockFilters): Promise<PaginatedStock | Failure> {
    try {
      return await this.stockDataSource.getPaginatedStocks(filters);
    } catch (error:any) {
      let response: any = error.error
      if (response.status_code == 400) {
        return new BadRequestFailure(response.message);
      }
      return new UnhandledFailure();
    }
  }

}