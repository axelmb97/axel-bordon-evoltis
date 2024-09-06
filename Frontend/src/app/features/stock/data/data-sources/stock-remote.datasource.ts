import { Injectable } from "@angular/core";
import { PaginatedStock } from "../../domain/entities/paginated-stock.entity";
import { StockFilters } from "../../domain/entities/stock-filters.entity";
import { environment } from "src/environments/environment.development";
import { HttpService } from "src/app/core/services/http-service.implementation";
import { PaginatedStockModel } from "../models/paginated-stock.model";

export abstract class StockRemoteDataSourceBase {
  abstract getPaginatedStocks(filters: StockFilters) : Promise<PaginatedStock>;
}

@Injectable()
export class StockRemoteDataSource extends StockRemoteDataSourceBase {
  private url: string = `${environment.apiUrl}/api/stocks`

  constructor(private httpService: HttpService){
    super();
  }

  override async getPaginatedStocks(filters: StockFilters): Promise<PaginatedStock> {
    let queryUrl = this.url + filters.getPath();
    let result = await this.httpService.get(queryUrl);
    let map = new Map<string,any>(Object.entries(result.get("response")));
    return PaginatedStockModel.fromJson(map);
  }
}