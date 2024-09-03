import { createAction, props } from "@ngrx/store";
import { SupplierActionName } from "./supplier-action-name";
import { Supplier } from "src/app/features/suppliers/domain/entities/supplier.entity";
import { Failure } from "../../failures/failure";

export const laodSuppliers = createAction(
  SupplierActionName.LOAD_SUPPLIERS
);

export const loadedSuppliers = createAction(
  SupplierActionName.LOADED_SUPPLIERS,
  props<{suppliers: Supplier[]}>()
);

export const setSupplierError = createAction(
  SupplierActionName.SET_ERROR,
  props<{error: Failure}>()
);