import { Failure } from "src/app/core/failures/failure";
import { PaginatedReceptions } from "../entities/paginated-receptions.entity";
import { ReceptionFilters } from "../entities/reception-filters.entity";
import { Reception } from "../entities/reception.entity";
import { CreateReception } from "../entities/create-reception.entity";

export abstract class ReceptionRepositoryBase {
  abstract getPaginatedReceptions(filters: ReceptionFilters) : Promise<PaginatedReceptions | Failure>;
  abstract getReceptionById(receptionId: number) : Promise<Reception | Failure>;
  abstract createReception(reception: CreateReception) : Promise<boolean | Failure>;
  abstract deleteReception(receptionId: number) : Promise<boolean | Failure>;
}