import { Injectable } from "@angular/core";
import { NoParams } from "src/app/core/utils/no-params";
import { UseCase } from "src/app/core/utils/usecase";
import { Supplier } from "../entities/supplier.entity";
import { Failure } from "src/app/core/failures/failure";
import { SupplierRepositoryBase } from "../repositories/supplier-base.repository";

@Injectable()
export class GetAllSuppiersUseCase implements UseCase<NoParams, Supplier[]> {

  constructor(private supplierRepositoryBase: SupplierRepositoryBase) {}

  execute(param: NoParams): Promise<Supplier[] | Failure> {
    return this.supplierRepositoryBase.getAll();
  }
}