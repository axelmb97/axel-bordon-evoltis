import {  Injectable } from "@angular/core";
import { UseCase } from "src/app/core/utils/usecase";
import { PurchaseOrderFilters } from "../entities/purchase-order-filters.entity";
import { PaginatedPurchaseOrders } from "../entities/paginated-purchases.entity";
import { Failure } from "src/app/core/failures/failure";
import { PurchaseOrderRepositoryBase } from "../repositories/purchase-order-base.repository";

@Injectable()
export class GetPaginatedPurchaseOrdersUseCase implements UseCase<PurchaseOrderFilters, PaginatedPurchaseOrders> {

  constructor(private purchaseOrderRepository: PurchaseOrderRepositoryBase){}

  execute(param: PurchaseOrderFilters): Promise<PaginatedPurchaseOrders | Failure> {
    return this.purchaseOrderRepository.getPaginatedPurchaseOrders(param);
  }

}
