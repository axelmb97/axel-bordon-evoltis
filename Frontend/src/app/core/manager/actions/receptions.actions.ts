import { createAction, props } from "@ngrx/store";
import { ReceptionActionName } from "./reception-action-names";
import { ReceptionFilters } from "src/app/features/receptions/domain/entities/reception-filters.entity";
import { PaginatedReceptions } from "src/app/features/receptions/domain/entities/paginated-receptions.entity";
import { Failure } from "../../failures/failure";

export const loadReceptions = createAction(
  ReceptionActionName.LOAD_PAGINATED_PURCHASES,
  props<{filters: ReceptionFilters}>()
);

export const loadedReceptions = createAction(
  ReceptionActionName.LOADED_PAGINATED_PURCHASES,
  props<{receptions: PaginatedReceptions}>()
);

export const setReceptionError = createAction(
  ReceptionActionName.SET_RECEPTION_ERROR,
  props<{error: Failure}>()
);

export const setReceptionSucces = createAction(
  ReceptionActionName.SET_RECEPTION_SUCCESS,
  props<{message:string}>()
);