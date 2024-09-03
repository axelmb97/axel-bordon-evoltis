import { Injectable } from "@angular/core";
import { PaginatedPurchaseOrders } from "../../domain/entities/paginated-purchases.entity";
import { PurchaseOrderFilters } from "../../domain/entities/purchase-order-filters.entity";
import { HttpServiceBase } from "src/app/core/services/http-service.base";
import { environment } from "src/environments/environment.development";
import { PaginatedPurchaseOrdersModel } from "../models/paginated-purchases.model";
import { CreatePurchaseOrder } from "../../domain/entities/create-purchase-order.entity";

export abstract class PurchaseOrderRemoteDataSourceBase {
  abstract getPaginatedPurchaseOrders(filters: PurchaseOrderFilters): Promise<PaginatedPurchaseOrders>;
  abstract createPurchaseOrder(purchaseOrder: CreatePurchaseOrder): Promise<boolean>;
}

@Injectable()

export class PurchaseOrderRemoteDataSource extends PurchaseOrderRemoteDataSourceBase {

  private url: string = `${environment.apiUrl}/api/purchase-orders`; 

  constructor(private httpService: HttpServiceBase){
    super();
  }

  override async getPaginatedPurchaseOrders(filters: PurchaseOrderFilters): Promise<PaginatedPurchaseOrders> {
    let pathUrl: string = `${this.url}${filters.getPath()}`    
    let result = await this.httpService.get(pathUrl);
    let map = new Map<string,any>(Object.entries(result.get("response")));
    return PaginatedPurchaseOrdersModel.fromJson(map);
  }

  override async  createPurchaseOrder(purchaseOrder: CreatePurchaseOrder): Promise<boolean> {
    let result = await this.httpService.post(this.url, purchaseOrder);
    return result.get("response");
  }
}