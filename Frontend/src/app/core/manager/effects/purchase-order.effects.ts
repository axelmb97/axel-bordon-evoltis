import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GetPaginatedPurchaseOrdersUseCase } from "src/app/features/purchase-orders/domain/usecases/get-paginated-purchase-orders.usecase";
import { createPurchaseOrder, deletePurchase, loadedPurchaseOrderById, loadedPurchaseOrderDetails, loadedPurchaseOrders, loadPurchaseOrderById, loadPurchaseOrderDetails, loadPurchaseOrders, setPurchaseOrderError, setPurchaseOrderSuccess } from "../actions/purchase-orders.actions";
import { from, map, mergeMap } from "rxjs";
import { PaginatedPurchaseOrders } from "src/app/features/purchase-orders/domain/entities/paginated-purchases.entity";
import { Failure } from "../../failures/failure";
import { CreatePurchaseOrderUseCase } from "src/app/features/purchase-orders/domain/usecases/create-purchase-order.usecase";
import { CreatePurchaseOrder } from "src/app/features/purchase-orders/domain/entities/create-purchase-order.entity";
import { DeletePurchaseOrderUseCase } from "src/app/features/purchase-orders/domain/usecases/delete-purchase-order.usecase";
import { GetPaginatedPurchaseOrderDetailsUseCase } from "src/app/features/purchase-orders/domain/usecases/get-paginated-purchase-order-details.usecase";
import { PaginatedPurchaseOrderDetails } from "src/app/features/purchase-orders/domain/entities/paginated-purchase-order-details.entity";
import { GetPurchaseOrderByIdUseCase } from "src/app/features/purchase-orders/domain/usecases/get-purchase-order-by-id.usecase";
import { PurchaseOrder } from "src/app/features/purchase-orders/domain/entities/purchase-order.entity";



@Injectable()
export class PurchaseOrderEffects {

  constructor(
    private actions$: Actions,
    private getPaginatedPurchaseOrdersUseCase: GetPaginatedPurchaseOrdersUseCase,
    private createPurchaseOrderUseCase: CreatePurchaseOrderUseCase,
    private deletePurchaseOrderUseCase: DeletePurchaseOrderUseCase,
    private getPaginatedPurchaseOrderDetailsUseCase: GetPaginatedPurchaseOrderDetailsUseCase,
    private getPurchaseOrderByIdUseCase: GetPurchaseOrderByIdUseCase
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

  deletePurchaseOrder = createEffect(() => 
    this.actions$.pipe(
      ofType(deletePurchase),
      mergeMap( action =>
        from(this.deletePurchaseOrderUseCase.execute(action.id)).pipe(
          map( (result: boolean | Failure) => {
            if (result instanceof Failure) {
              return (setPurchaseOrderError({error:result}));
            }
            return setPurchaseOrderSuccess({message: "Se elimino la orden de compra exitosamente"}) 
          })
        )
      )
    )
  );

  getPurchaseOrderDetails = createEffect(() => 
    this.actions$.pipe(
      ofType(loadPurchaseOrderDetails),
      mergeMap( action => 
        from(this.getPaginatedPurchaseOrderDetailsUseCase.execute(action.filters)).pipe(
          map( (result: PaginatedPurchaseOrderDetails | Failure) => {
            if (result instanceof Failure) {
              return (setPurchaseOrderError({error:result}));
            }
            return loadedPurchaseOrderDetails({details: result})
          })
        )
      )
    )
  );

  getPurchaseOrderById = createEffect(() => 
    this.actions$.pipe(
      ofType(loadPurchaseOrderById),
      mergeMap( action =>
        from(this.getPurchaseOrderByIdUseCase.execute(action.purchaseId)).pipe(
          map( (result: PurchaseOrder | Failure) => {
            if (result instanceof Failure) {
              return (setPurchaseOrderError({error:result}));
            }
            console.log(result);
            
            return loadedPurchaseOrderById({purchase: result})
          })
        )
      )
    )
  );
}


