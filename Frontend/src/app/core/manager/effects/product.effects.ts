import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GetAllProductsUseCase } from "src/app/features/products/domain/usecases/get-all-products.usecase";
import { ProductActionName } from "../actions/product-action-name";
import { from, map, mergeMap } from "rxjs";
import { Product } from "src/app/features/products/domain/entities/product.entity";
import { Failure } from "../../failures/failure";
import { loadedProducts } from "../actions/products.actions";
import { setEmployeeError } from "../actions/employees.actions";

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private getAllProductsUseCase: GetAllProductsUseCase
  ){}

  getAllProducts = createEffect(() => this.actions$.pipe(
    ofType(ProductActionName.LOAD_PRODUCTS),
    mergeMap(() => 
      from(this.getAllProductsUseCase.execute({})).pipe(
        map( (result: Product[] | Failure) => {
          if (result instanceof Failure) {
            return setEmployeeError({error:result});
          }
          return loadedProducts({products: result});
        })
      )
    )
  ));
}