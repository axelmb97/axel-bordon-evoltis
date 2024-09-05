import { Injectable } from "@angular/core";
import { ReceptionRepositoryBase } from "../../domain/repositories/reception-base.repository";
import { Failure } from "src/app/core/failures/failure";
import { PaginatedReceptions } from "../../domain/entities/paginated-receptions.entity";
import { ReceptionFilters } from "../../domain/entities/reception-filters.entity";
import { ReceptionRemoteDataSourceBase } from "../data-sources/reception-remote.datasource";
import { UnhandledFailure } from "src/app/core/failures/unhandled.failure";
import { Reception } from "../../domain/entities/reception.entity";

@Injectable()
export class ReceptionRepository extends ReceptionRepositoryBase {

  constructor(private receptionDataSource: ReceptionRemoteDataSourceBase){
    super();
  }

  override async getPaginatedReceptions(filters: ReceptionFilters): Promise<PaginatedReceptions | Failure> {
    try {
      return await this.receptionDataSource.getPaginatedReceptions(filters);
    } catch (error:any) {
      return new UnhandledFailure();
    }
  }

  override async getReceptionById(receptionId: number): Promise<Reception | Failure> {
    try {
      return await this.receptionDataSource.getReceptionById(receptionId);
    } catch (error:any) {
      console.log("ERROR", error);
      
      return new UnhandledFailure();
    }
  }
}