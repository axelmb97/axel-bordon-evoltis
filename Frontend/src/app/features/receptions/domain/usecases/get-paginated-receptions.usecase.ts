import { Injectable } from "@angular/core";
import { UseCase } from "src/app/core/utils/usecase";
import { ReceptionFilters } from "../entities/reception-filters.entity";
import { PaginatedReceptions } from "../entities/paginated-receptions.entity";
import { Failure } from "src/app/core/failures/failure";
import { ReceptionRepositoryBase } from "../repositories/reception-base.repository";

@Injectable()
export class GetPaginatedReceptionsUseCase implements UseCase<ReceptionFilters, PaginatedReceptions> {

  constructor(private receptionRpository: ReceptionRepositoryBase){}

  execute(param: ReceptionFilters): Promise<PaginatedReceptions | Failure> {
    return this.receptionRpository.getPaginatedReceptions(param);
  }

}