import { Injectable } from "@angular/core";
import { ReceptionRepositoryBase } from "../../domain/repositories/reception-base.repository";
import { Failure } from "src/app/core/failures/failure";
import { PaginatedReceptions } from "../../domain/entities/paginated-receptions.entity";
import { ReceptionFilters } from "../../domain/entities/reception-filters.entity";
import { ReceptionRemoteDataSourceBase } from "../data-sources/reception-remote.datasource";
import { UnhandledFailure } from "src/app/core/failures/unhandled.failure";
import { Reception } from "../../domain/entities/reception.entity";
import { CreateReception } from "../../domain/entities/create-reception.entity";
import { BadRequestFailure } from "src/app/core/failures/bad-request.failure";
import { NotFoundFailure } from "src/app/core/failures/not-found-failure";

@Injectable()
export class ReceptionRepository extends ReceptionRepositoryBase {

  constructor(private receptionDataSource: ReceptionRemoteDataSourceBase){
    super();
  }

  override async getPaginatedReceptions(filters: ReceptionFilters): Promise<PaginatedReceptions | Failure> {
    try {
      return await this.receptionDataSource.getPaginatedReceptions(filters);
    } catch (error:any) {
      let response: any = error.error
      if (response.status_code == 400) {
        return new BadRequestFailure(response.message);
      }
      return new UnhandledFailure();
    }
  }

  override async getReceptionById(receptionId: number): Promise<Reception | Failure> {
    try {
      return await this.receptionDataSource.getReceptionById(receptionId);
    } catch (error:any) {
      let response: any = error.error
      if (response.status_code == 400) {
        return new BadRequestFailure(response.message);
      }
      if (response.status_code == 404) {
        return new NotFoundFailure();
      }
      return new UnhandledFailure();
    }
  }

  override async createReception(reception: CreateReception): Promise<boolean | Failure> {
    try {
      return await this.receptionDataSource.createReception(reception);
    } catch (error:any) {
      let response: any = error.error
      if (response.status_code == 400) {
        return new BadRequestFailure(response.message);
      }
      return new UnhandledFailure();
    }
  }

  override async deleteReception(receptionId: number): Promise<boolean | Failure> {
     try {
      return await this.receptionDataSource.deleteReception(receptionId);
    } catch (error:any) {
      let response: any = error.error
      if (response.status_code == 400) {
        return new BadRequestFailure(response.message);
      }
      return new UnhandledFailure();
    }
  }
 
}