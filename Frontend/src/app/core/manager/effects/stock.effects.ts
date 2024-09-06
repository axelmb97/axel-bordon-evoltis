import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GetPaginatedStocksUseCase } from "src/app/features/stock/domain/usecases/get-paginated-stocks.usecase";
import { loadedStocks, loadStocks, setStockError } from "../actions/stocks.actions";
import { from, map, mergeMap } from "rxjs";
import { PaginatedStock } from "src/app/features/stock/domain/entities/paginated-stock.entity";
import { Failure } from "../../failures/failure";

@Injectable()
export class StockEffects {

  constructor(
    private actions$: Actions,
    private getPaginatedStockUseCase: GetPaginatedStocksUseCase
  ){}

  getPaginatedStock = createEffect(() => 
    this.actions$.pipe(
      ofType(loadStocks),
      mergeMap(action => 
        from(this.getPaginatedStockUseCase.execute(action.filters)).pipe(
          map( (result: PaginatedStock | Failure) => {
            if (result instanceof Failure) {
              return setStockError({error: result});
            }

            return loadedStocks({stocks: result});
          })
        )
      )
    )
  );
}