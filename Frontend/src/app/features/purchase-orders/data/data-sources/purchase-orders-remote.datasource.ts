import { Injectable } from "@angular/core";
import { PaginatedPurchaseOrders } from "../../domain/entities/paginated-purchases.entity";
import { PurchaseOrderFilters } from "../../domain/entities/purchase-order-filters.entity";
import { HttpServiceBase } from "src/app/core/services/http-service.base";
import { environment } from "src/environments/environment.development";
import { PaginatedPurchaseOrdersModel } from "../models/paginated-purchases.model";
import { CreatePurchaseOrder } from "../../domain/entities/create-purchase-order.entity";
import { CreatePurchaseOrderModel } from "../models/create-purchase-order.model";
import { PurchaseOrderDetailFilters } from "../../domain/entities/purchase-order-deatil-filters.entoty";
import { PaginatedPurchaseOrderDetails } from "../../domain/entities/paginated-purchase-order-details.entity";
import { PaginatedPurchaseOrderDetailsModel } from "../models/paginated-purchase-order-details.model";
import { PurchaseOrder } from "../../domain/entities/purchase-order.entity";
import { PurchaseOrderModel } from "../models/purchase-order.model";

export abstract class PurchaseOrderRemoteDataSourceBase {
  abstract getPaginatedPurchaseOrders(filters: PurchaseOrderFilters): Promise<PaginatedPurchaseOrders>;
  abstract createPurchaseOrder(purchaseOrder: CreatePurchaseOrder): Promise<boolean>;
  abstract deletePurchseOrder(purchaseId: number): Promise<boolean>;
  abstract getPaginatedPurchaseOrderDetails(filters:PurchaseOrderDetailFilters): Promise<PaginatedPurchaseOrderDetails>;
  abstract getPurchaseOrderById(purchaseId: number) : Promise<PurchaseOrder>
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
    let p = new CreatePurchaseOrderModel(0,'',[]);
    Object.assign(p, purchaseOrder);
    if (purchaseOrder.details) {
      p.details = [...purchaseOrder.details]; // Copiar el array de detalles
    }

    let result = await this.httpService.post(this.url, p);
    return result.get("response");
  }

  override async deletePurchseOrder(purchaseId: number): Promise<boolean> {
    let result = await this.httpService.delete(`${this.url}/${purchaseId}`);
    return result.get("response")
  }

  override async getPaginatedPurchaseOrderDetails(filters: PurchaseOrderDetailFilters): Promise<PaginatedPurchaseOrderDetails> {
    let pathUrl: string = `${this.url}/${filters.purchaseOrderId}/details${filters.getPath()}`    
    let result = await this.httpService.get(pathUrl);
    let map = new Map<string,any>(Object.entries(result.get("response")));
    return PaginatedPurchaseOrderDetailsModel.fromJson(map);
  }

  override async getPurchaseOrderById(purchaseId: number): Promise<PurchaseOrder> {
    let result = await this.httpService.get(`${this.url}/${purchaseId}`);
    let map = new Map<string,any>(Object.entries(result.get("response")));
    return PurchaseOrderModel.fromJson(map);
  }
}