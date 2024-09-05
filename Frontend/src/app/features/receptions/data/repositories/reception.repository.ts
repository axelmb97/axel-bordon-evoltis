import { Injectable } from "@angular/core";
import { ReceptionRepositoryBase } from "../../domain/repositories/reception-base.repository";
import { Failure } from "src/app/core/failures/failure";
import { PaginatedReceptions } from "../../domain/entities/paginated-receptions.entity";
import { ReceptionFilters } from "../../domain/entities/reception-filters.entity";
import { ReceptionRemoteDataSourceBase } from "../data-sources/reception-remote.datasource";
import { UnhandledFailure } from "src/app/core/failures/unhandled.failure";

@Injectable()
export class ReceptionRepository extends ReceptionRepositoryBase {

  constructor(private receptionDataSource: ReceptionRemoteDataSourceBase){
    super();
  }

  override async getPaginatedReceptions(filters: ReceptionFilters): Promise<PaginatedReceptions | Failure> {
    try {
      return await this.receptionDataSource.getPaginatedReceptions(filters);
    } catch (error) {
      return new UnhandledFailure();
    }
  }

}