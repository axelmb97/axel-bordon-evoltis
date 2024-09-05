import { Failure } from "src/app/core/failures/failure";
import { PaginatedReceptions } from "../entities/paginated-receptions.entity";
import { ReceptionFilters } from "../entities/reception-filters.entity";

export abstract class ReceptionRepositoryBase {
  abstract getPaginatedReceptions(filters: ReceptionFilters) : Promise<PaginatedReceptions | Failure>;
}