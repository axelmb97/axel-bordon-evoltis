import { Failure } from "src/app/core/failures/failure";
import { Supplier } from "../entities/supplier.entity";

export abstract class SupplierRepositoryBase {
  abstract getAll() : Promise<Supplier[] | Failure>;
}