import { Injectable } from "@angular/core";
import { PaginatedReceptions } from "../../domain/entities/paginated-receptions.entity";
import { ReceptionFilters } from "../../domain/entities/reception-filters.entity";
import { HttpServiceBase } from "src/app/core/services/http-service.base";
import { environment } from "src/environments/environment.development";
import { PaginatedReceptionModel } from "../models/paginated-receptions.models";
import { Reception } from "../../domain/entities/reception.entity";
import { ReceptionModel } from "../models/reception.model";

export abstract class ReceptionRemoteDataSourceBase {
  abstract getPaginatedReceptions(filters: ReceptionFilters) : Promise<PaginatedReceptions>;
  abstract getReceptionById(receptionId: number) : Promise<Reception>;
}

@Injectable()
export class ReceptionRemoteDataSource extends ReceptionRemoteDataSourceBase {

  private url: string = `${environment.apiUrl}/api/receptions`

  constructor(private httpService: HttpServiceBase){
    super();
  }

  override async getPaginatedReceptions(filters: ReceptionFilters): Promise<PaginatedReceptions> {
    let queryUrl = this.url + filters.getPath();
    let result = await this.httpService.get(queryUrl);
    let map = new Map<string,any>(Object.entries(result.get("response")));
    return PaginatedReceptionModel.fromJson(map);
  }

  override async getReceptionById(receptionId: number): Promise<Reception> {
     let result = await this.httpService.get(`${this.url}/${receptionId}`);
     let map = new Map<string,any>(Object.entries(result.get("response")));
     return ReceptionModel.fromJson(map);
  }
}