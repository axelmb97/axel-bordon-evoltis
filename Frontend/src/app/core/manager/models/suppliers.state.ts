import { Supplier } from "../../../features/suppliers/domain/entities/supplier.entity";
import { Failure } from "../../failures/failure";

export interface SuppliersState {
  loading: boolean;
  suppliers: Supplier[];
  error?: Failure;
}