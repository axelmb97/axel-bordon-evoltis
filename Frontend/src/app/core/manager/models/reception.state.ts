import { PaginatedReceptions } from "src/app/features/receptions/domain/entities/paginated-receptions.entity";
import { ReceptionFilters } from "src/app/features/receptions/domain/entities/reception-filters.entity";
import { Failure } from "../../failures/failure";

export interface ReceptionsState {
  loading: boolean;
  filters?: ReceptionFilters;
  receptionsPagination?: PaginatedReceptions;
  // currentPurchase?: CreatePurchaseOrder;
  error?: Failure;
  success: string;
}