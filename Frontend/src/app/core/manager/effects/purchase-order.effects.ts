import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GetPaginatedPurchaseOrdersUseCase } from "src/app/features/purchase-orders/domain/usecases/get-paginated-purchase-orders.usecase";
import { createPurchaseOrder, loadedPurchaseOrders, loadPurchaseOrders, setPurchaseOrderError, setPurchaseOrderSuccess } from "../actions/purchase-orders.actions";
import { from, map, mergeMap } from "rxjs";
import { PaginatedPurchaseOrders } from "src/app/features/purchase-orders/domain/entities/paginated-purchases.entity";
import { Failure } from "../../failures/failure";
import { CreatePurchaseOrderUseCase } from "src/app/features/purchase-orders/domain/usecases/create-purchase-order.usecase";



@Injectable()
export class PurchaseOrderEffects {

  constructor(
    private actions$: Actions,
    private getPaginatedPurchaseOrdersUseCase: GetPaginatedPurchaseOrdersUseCase,
    private createPurchaseOrderUseCase: CreatePurchaseOrderUseCase
  ){}

  getPaginatedPurchaseOrders = createEffect(() => this.actions$.pipe(
    ofType(loadPurchaseOrders),
    mergeMap( action => 
      from(this.getPaginatedPurchaseOrdersUseCase.execute(action.filters)).pipe(
        map( (result: PaginatedPurchaseOrders | Failure) => {
          if (result instanceof Failure) {
            return setPurchaseOrderError({error: result});
          }
          return loadedPurchaseOrders({purchases: result});
        })
      )
    )
  ));

  createPurchaseOrder = createEffect( () => this.actions$.pipe(
    ofType(createPurchaseOrder),
    mergeMap( action => 
      from(this.createPurchaseOrderUseCase.execute(action.purchaseOrder)).pipe(
        map( (result: boolean | Failure) => {
          if (result instanceof Failure) {
            return (setPurchaseOrderError({error:result}));
          }
          return setPurchaseOrderSuccess({message: "Orden de compra creada correctamente"})
        })
      )
    )

  ));
}


