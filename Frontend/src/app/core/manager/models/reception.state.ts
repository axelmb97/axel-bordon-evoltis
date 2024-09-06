import { PaginatedReceptions } from "src/app/features/receptions/domain/entities/paginated-receptions.entity";
import { ReceptionFilters } from "src/app/features/receptions/domain/entities/reception-filters.entity";
import { Failure } from "../../failures/failure";
import { Reception } from "src/app/features/receptions/domain/entities/reception.entity";

export interface ReceptionsState {
  loading: boolean;
  filters?: ReceptionFilters;
  receptionsPagination?: PaginatedReceptions;
  receptionById?: Reception;
  error?: Failure;
  success: string;
}