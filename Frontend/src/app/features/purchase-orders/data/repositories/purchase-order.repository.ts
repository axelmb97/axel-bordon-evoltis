import { Injectable } from "@angular/core";
import { PurchaseOrderRepositoryBase } from "../../domain/repositories/purchase-order-base.repository";
import { Failure } from "src/app/core/failures/failure";
import { PaginatedPurchaseOrders } from "../../domain/entities/paginated-purchases.entity";
import { PurchaseOrderFilters } from "../../domain/entities/purchase-order-filters.entity";
import { PurchaseOrderRemoteDataSourceBase } from "../data-sources/purchase-orders-remote.datasource";
import { filter } from "rxjs";
import { UnhandledFailure } from "src/app/core/failures/unhandled.failure";
import { CreatePurchaseOrder } from "../../domain/entities/create-purchase-order.entity";
import { PaginatedPurchaseOrderDetails } from "../../domain/entities/paginated-purchase-order-details.entity";
import { PurchaseOrderDetailFilters } from "../../domain/entities/purchase-order-deatil-filters.entoty";
import { PurchaseOrder } from "../../domain/entities/purchase-order.entity";
import { NotFoundFailure } from "src/app/core/failures/not-found-failure";
import { BadRequestFailure } from "src/app/core/failures/bad-request.failure";

@Injectable()
export class PurchaseOrderRepository extends PurchaseOrderRepositoryBase {

  constructor(private purchaseOrderRemoteDataSource: PurchaseOrderRemoteDataSourceBase){
    super();
  }

  override async getPaginatedPurchaseOrders(filters: PurchaseOrderFilters): Promise<PaginatedPurchaseOrders | Failure> {
    try {
      return await this.purchaseOrderRemoteDataSource.getPaginatedPurchaseOrders(filters);
    } catch (error:any) {
      let response: any = error.error
      if (response.status_code == 400) {
        return new BadRequestFailure(response.message);
      }
      return new UnhandledFailure();
    }
  }

  override async createPurchaseOrder(purchaseOrder: CreatePurchaseOrder): Promise<boolean | Failure> {
    try {
      return await this.purchaseOrderRemoteDataSource.createPurchaseOrder(purchaseOrder);
    } catch (error:any) {
      let response: any = error.error
      if (response.status_code == 400) {
        return new BadRequestFailure(response.message);
      }
      return new UnhandledFailure();
    }
  }

  override async deletePurchaseOrder(purchaseOrderId: number): Promise<boolean | Failure> {
    try {
      return await this.purchaseOrderRemoteDataSource.deletePurchseOrder(purchaseOrderId);
    } catch (error:any) {

      let response: any = error.error
      if (response.status_code == 404) {
        return new NotFoundFailure(response.message);
      }
      if (response.status_code == 400) {
        return new BadRequestFailure(response.message);
      }
      
      return new UnhandledFailure();
    }
  }

  override async getPaginatedPurchaseOrderDetails(filters: PurchaseOrderDetailFilters): Promise<PaginatedPurchaseOrderDetails | Failure> {
    try {
      return await this.purchaseOrderRemoteDataSource.getPaginatedPurchaseOrderDetails(filters);
    } catch (error:any) {
      let response: any = error.error
      if (response.status_code == 400) {
        return new BadRequestFailure(response.message);
      }
      return new UnhandledFailure();
    }
  }

  override async getPurchaseOrderById(purchaseId: number): Promise<PurchaseOrder | Failure> {
    try {
      return await this.purchaseOrderRemoteDataSource.getPurchaseOrderById(purchaseId);
    } catch (error:any) {
      let response: any = error.error
      if (response.status_code == 404) {
        return new NotFoundFailure(response.message);
      }
      return new UnhandledFailure();
    }
  }

  override async updatePurchaseOrder(purchase: CreatePurchaseOrder): Promise<boolean | Failure> {
    try {
      return await this.purchaseOrderRemoteDataSource.updatePurchaseOrder(purchase);
    } catch (error:any) {   
      let response: any = error.error
      if (response.status_code == 404) {
        return new NotFoundFailure(response.message);
      }
      return new UnhandledFailure();
    }
  }
}