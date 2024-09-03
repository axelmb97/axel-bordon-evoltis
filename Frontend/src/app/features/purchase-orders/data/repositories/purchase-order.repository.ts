import { Injectable } from "@angular/core";
import { PurchaseOrderRepositoryBase } from "../../domain/repositories/purchase-order-base.repository";
import { Failure } from "src/app/core/failures/failure";
import { PaginatedPurchaseOrders } from "../../domain/entities/paginated-purchases.entity";
import { PurchaseOrderFilters } from "../../domain/entities/purchase-order-filters.entity";
import { PurchaseOrderRemoteDataSourceBase } from "../data-sources/purchase-orders-remote.datasource";
import { filter } from "rxjs";
import { UnhandledFailure } from "src/app/core/failures/unhandled.failure";
import { CreatePurchaseOrder } from "../../domain/entities/create-purchase-order.entity";

@Injectable()
export class PurchaseOrderRepository extends PurchaseOrderRepositoryBase {


  constructor(private purchaseOrderRemoteDataSource: PurchaseOrderRemoteDataSourceBase){
    super();
  }

  override async getPaginatedPurchaseOrders(filters: PurchaseOrderFilters): Promise<PaginatedPurchaseOrders | Failure> {
    try {
      return await this.purchaseOrderRemoteDataSource.getPaginatedPurchaseOrders(filters);
    } catch (error:any) {
      return new UnhandledFailure();
    }
  }

  override async createPurchaseOrder(purchaseOrder: CreatePurchaseOrder): Promise<boolean | Failure> {
    try {
      return await this.purchaseOrderRemoteDataSource.createPurchaseOrder(purchaseOrder);
    } catch (error:any) {
      return new UnhandledFailure();
    }
  }
}