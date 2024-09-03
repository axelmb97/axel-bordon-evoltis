import { EmployeesState } from "../models/employee.state";
import * as EmployeeActions from "../actions/employees.actions"
import { createReducer, on } from "@ngrx/store";

export const initialState : EmployeesState = {
  loading: false,
  employees: []
}

export const employeesReducers = createReducer(
  initialState,
  on(EmployeeActions.loadEmployees, (state) => {
    return {...state, loading: true};
  }),
  on(EmployeeActions.loadedEmployees, (state, prop) => {
    return {...state, loading: false, employees: prop.employees};
  }),
  on(EmployeeActions.setEmployeeError, (state, prop) => {
    return {...state, loading: false, error: prop.error};
  })
);

