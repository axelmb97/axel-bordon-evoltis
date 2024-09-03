import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GetAllSuppiersUseCase } from "src/app/features/suppliers/domain/usecases/get-all-suppliers.usecase";
import { SupplierActionName } from "../actions/supplier-action-name";
import { from, map, mergeMap } from "rxjs";
import { Supplier } from "src/app/features/suppliers/domain/entities/supplier.entity";
import { Failure } from "../../failures/failure";
import { loadedSuppliers, setSupplierError } from "../actions/suppliers.actions";

@Injectable()
export class SupplierEffects {
  constructor(
    private actions$: Actions,
    private getAllSuppliersUseCase: GetAllSuppiersUseCase
  ){}

  getAllSuppliers = createEffect(() => this.actions$.pipe(
    ofType(SupplierActionName.LOAD_SUPPLIERS),
    mergeMap(() => 
      from(this.getAllSuppliersUseCase.execute({})).pipe(
        map( (result: Supplier[] | Failure) => {
          if (result instanceof Failure) {
            return setSupplierError({error: result});
          }
          return loadedSuppliers({suppliers: result});
        })
      )
    )
  ));
}