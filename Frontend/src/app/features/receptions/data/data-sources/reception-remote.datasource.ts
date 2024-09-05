import { Injectable } from "@angular/core";
import { PaginatedReceptions } from "../../domain/entities/paginated-receptions.entity";
import { ReceptionFilters } from "../../domain/entities/reception-filters.entity";
import { HttpServiceBase } from "src/app/core/services/http-service.base";
import { environment } from "src/environments/environment.development";
import { PaginatedReceptionModel } from "../models/paginated-receptions.models";

export abstract class ReceptionRemoteDataSourceBase {
  abstract getPaginatedReceptions(filters: ReceptionFilters) : Promise<PaginatedReceptions>;
}

@Injectable()
export class ReceptionRemoteDataSource extends ReceptionRemoteDataSourceBase {
  private url: string = `${environment.apiUrl}/receptions`

  constructor(private httpService: HttpServiceBase){
    super();
  }

  override async getPaginatedReceptions(filters: ReceptionFilters): Promise<PaginatedReceptions> {
    let queryUrl = this.url + filters.getPath;
    let result = await this.httpService.get(queryUrl);
    let map = new Map<string,any>(result.get("response"));
    return PaginatedReceptionModel.fromJson(map);
  }

}