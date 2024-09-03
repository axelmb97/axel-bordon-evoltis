import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { EmployeesState } from "../models/employee.state";

export const selectEmployeeFeature = (appState: AppState) => appState.employees;

export const selectIsEmployeeLoading = createSelector(
  selectEmployeeFeature,
  (employeeState: EmployeesState) => employeeState.loading
);

export const selectEmployees = createSelector(
  selectEmployeeFeature,
  (employeeState: EmployeesState) => employeeState.employees
);

export const selectEmployeeError = createSelector(
  selectEmployeeFeature,
  (employeeState: EmployeesState) => employeeState.error
);