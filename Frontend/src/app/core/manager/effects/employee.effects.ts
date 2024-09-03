import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GetAllEmployeesUseCase } from "src/app/features/employees/domain/usecases/get-all-employees.usecase";
import { loadedEmployees, setEmployeeError } from "../actions/employees.actions";
import { from, map, mergeMap } from "rxjs";
import { EmployeActionName } from "../actions/employee-action-names";
import { Employee } from "src/app/features/employees/domain/entities/employee.entity";
import { Failure } from "../../failures/failure";

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private getAllEmployeesUseCase: GetAllEmployeesUseCase
  ){}

  getAllEmployees = createEffect(() => this.actions$.pipe(
    ofType(EmployeActionName.LOAD_EMPLOYEES),
    mergeMap(() => 
      from(this.getAllEmployeesUseCase.execute({})).pipe(
        map((result: Employee[] | Failure) => {
          if (result instanceof Failure) {
            return setEmployeeError({error: result});
          }
          return loadedEmployees({employees:result});
        })
      )
    )
  ));
}