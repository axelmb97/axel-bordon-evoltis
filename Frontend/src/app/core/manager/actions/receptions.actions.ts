import { createAction, props } from "@ngrx/store";
import { ReceptionActionName } from "./reception-action-names";
import { ReceptionFilters } from "src/app/features/receptions/domain/entities/reception-filters.entity";
import { PaginatedReceptions } from "src/app/features/receptions/domain/entities/paginated-receptions.entity";
import { Failure } from "../../failures/failure";
import { Reception } from "src/app/features/receptions/domain/entities/reception.entity";
import { CreateReception } from "src/app/features/receptions/domain/entities/create-reception.entity";

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

export const loadReceptionById = createAction(
  ReceptionActionName.LOAD_RECEPTION_BY_ID,
  props<{id:number}>()
);

export const loadedReceptionById = createAction(
  ReceptionActionName.LOADED_RECEPTION_BY_ID,
  props<{reception: Reception}>()
);

export const createReception = createAction(
  ReceptionActionName.CREATE_RECEPTION,
  props<{reception: CreateReception}>()
);

export const deleteReception = createAction(
  ReceptionActionName.DELETE_RECEPTION,
  props<{receptionId: number}>()
);