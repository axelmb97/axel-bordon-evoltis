import { Injectable } from "@angular/core";
import { Failure } from "src/app/core/failures/failure";
import { UseCase } from "src/app/core/utils/usecase";
import { PurchaseOrderRepositoryBase } from "../repositories/purchase-order-base.repository";

@Injectable()
export class DeletePurchaseOrderUseCase implements UseCase<number, boolean> {

  constructor(private purchaseOrderRepository: PurchaseOrderRepositoryBase){}

  execute(param: number): Promise<boolean | Failure> {
    return this.purchaseOrderRepository.deletePurchaseOrder(param);
  }
}