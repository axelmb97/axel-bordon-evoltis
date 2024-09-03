import { Injectable } from "@angular/core";
import { UseCase } from "src/app/core/utils/usecase";
import { CreatePurchaseOrder } from "../entities/create-purchase-order.entity";
import { Failure } from "src/app/core/failures/failure";
import { PurchaseOrderRepositoryBase } from "../repositories/purchase-order-base.repository";

@Injectable()
export class CreatePurchaseOrderUseCase implements UseCase<CreatePurchaseOrder, boolean> {

  constructor(private purchaseOrderRepository: PurchaseOrderRepositoryBase){}
  
  execute(param: CreatePurchaseOrder): Promise<boolean | Failure> {
    return this.purchaseOrderRepository.createPurchaseOrder(param);
  }
}