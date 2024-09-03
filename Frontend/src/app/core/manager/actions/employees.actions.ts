import { createAction, props } from "@ngrx/store";
import { EmployeActionName } from "./employee-action-names";
import { Employee } from "src/app/features/employees/domain/entities/employee.entity";
import { Failure } from "../../failures/failure";

export const loadEmployees = createAction(
  EmployeActionName.LOAD_EMPLOYEES
);

export const loadedEmployees = createAction(
  EmployeActionName.LOADED_EMPLOYEES,
  props<{employees: Employee[]}>()
);

export const setEmployeeError = createAction(
  EmployeActionName.SET_ERROR,
  props<{error: Failure}>()
);
