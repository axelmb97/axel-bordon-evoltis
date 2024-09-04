import { Injectable } from "@angular/core";
import { UseCase } from "src/app/core/utils/usecase";
import { PurchaseOrder } from "../entities/purchase-order.entity";
import { Failure } from "src/app/core/failures/failure";
import { PurchaseOrderRepositoryBase } from "../repositories/purchase-order-base.repository";

@Injectable()
export class GetPurchaseOrderByIdUseCase implements UseCase<number, PurchaseOrder> {
  
  constructor(private purchaseOrderRepository: PurchaseOrderRepositoryBase){}

  execute(param: number): Promise<PurchaseOrder | Failure> {
    return this.purchaseOrderRepository.getPurchaseOrderById(param);
  }

}