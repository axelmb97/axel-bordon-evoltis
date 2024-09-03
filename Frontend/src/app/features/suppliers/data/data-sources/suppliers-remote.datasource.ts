import { Injectable } from "@angular/core";
import { Supplier } from "../../domain/entities/supplier.entity";
import { HttpServiceBase } from "src/app/core/services/http-service.base";
import { environment } from "src/environments/environment.development";
import { SupplierModel } from "../models/supplier.model";

export abstract class SupplierRemoteDataSourceBase {
  abstract getAll() : Promise<Supplier[]>;
}

@Injectable()
export class SupplierRemoteDataSource extends SupplierRemoteDataSourceBase {
  private url: string = `${environment.apiUrl}/api/suppliers`;

  constructor(private httpService: HttpServiceBase){
    super();
  }

  override async getAll(): Promise<Supplier[]> {
    let result = await this.httpService.get(this.url);
    return this.getMappedSuppliers(result.get("response"));
  }

  private getMappedSuppliers(data: any): Supplier[] {

    let suppliers: Supplier[]  = [];

    for (const supplier of data) {
      let supplierMap = new Map<string,any>(Object.entries(supplier));
      let supplierModel = SupplierModel.fromJson(supplierMap);
      suppliers.push(supplierModel);
    }

    return suppliers;
  }
}
