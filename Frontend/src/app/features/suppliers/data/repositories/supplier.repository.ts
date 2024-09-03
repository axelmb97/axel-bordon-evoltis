import { Injectable } from "@angular/core";
import { SupplierRepositoryBase } from "../../domain/repositories/supplier-base.repository";
import { Failure } from "src/app/core/failures/failure";
import { Supplier } from "../../domain/entities/supplier.entity";
import { SupplierRemoteDataSourceBase } from "../data-sources/suppliers-remote.datasource";
import { UnhandledFailure } from "src/app/core/failures/unhandled.failure";

@Injectable()
export class SupplierRepository extends SupplierRepositoryBase {

  constructor(private supplierRemoteDataSource: SupplierRemoteDataSourceBase){
    super();
  }

  override async getAll(): Promise<Supplier[] | Failure> {
    try {
      return await this.supplierRemoteDataSource.getAll();
    } catch (error:any) {
      return new UnhandledFailure();
    }
  }
}