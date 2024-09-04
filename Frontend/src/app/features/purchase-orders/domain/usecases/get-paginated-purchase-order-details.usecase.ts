import { Injectable } from "@angular/core";
import { UseCase } from "src/app/core/utils/usecase";
import { PurchaseOrderDetailFilters } from "../entities/purchase-order-deatil-filters.entoty";
import { PaginatedPurchaseOrderDetails } from "../entities/paginated-purchase-order-details.entity";
import { Failure } from "src/app/core/failures/failure";
import { PurchaseOrderRepositoryBase } from "../repositories/purchase-order-base.repository";

@Injectable()
export class GetPaginatedPurchaseOrderDetailsUseCase implements UseCase<PurchaseOrderDetailFilters, PaginatedPurchaseOrderDetails> {

  constructor(private purchaseOrderRepository: PurchaseOrderRepositoryBase){}
  
  execute(param: PurchaseOrderDetailFilters): Promise<PaginatedPurchaseOrderDetails | Failure> {
    return this.purchaseOrderRepository.getPaginatedPurchaseOrderDetails(param);
  }


}