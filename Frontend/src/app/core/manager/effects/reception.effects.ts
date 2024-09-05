import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GetPaginatedReceptionsUseCase } from "src/app/features/receptions/domain/usecases/get-paginated-receptions.usecase";
import { loadedReceptionById, loadedReceptions, loadReceptionById, loadReceptions, setReceptionError, setReceptionSucces } from "../actions/receptions.actions";
import { from, map, mergeMap } from "rxjs";
import { PaginatedReceptions } from "src/app/features/receptions/domain/entities/paginated-receptions.entity";
import { Failure } from "../../failures/failure";
import { GetReceptionByIdUseCase } from "src/app/features/receptions/domain/usecases/get-reception-by-id.usecase";
import { Reception } from "src/app/features/receptions/domain/entities/reception.entity";

@Injectable()
export class ReceptionEffects {
  constructor(
    private actions$: Actions,
    private getPaginatedReceptionsUseCase: GetPaginatedReceptionsUseCase,
    private getReceptionByIdUseCase: GetReceptionByIdUseCase
  ){}

  getPaginatedReceptions = createEffect( () =>
    this.actions$.pipe(
      ofType(loadReceptions),
      mergeMap( action => 
        from(this.getPaginatedReceptionsUseCase.execute(action.filters)).pipe(
          map( (result : PaginatedReceptions | Failure) => {
            
            if (result instanceof Failure) {
              return setReceptionError({error: result})
            }

            return loadedReceptions({receptions: result});
          })
        )
      )
    )
  );

  getReceptionById = createEffect(() => 
    this.actions$.pipe(
      ofType(loadReceptionById),
      mergeMap( action =>
        from(this.getReceptionByIdUseCase.execute(action.id)).pipe(
          map( (result: Reception | Failure) => {
             
            if (result instanceof Failure) {
              return setReceptionError({error: result})
            }

            return loadedReceptionById({reception:result});
          })
        )
      )
    )
  );
}