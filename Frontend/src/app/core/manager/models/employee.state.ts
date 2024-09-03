import { Employee } from "../../../features/employees/domain/entities/employee.entity";
import { Failure } from "../../failures/failure";

export interface EmployeesState {
  loading: boolean;
  employees: Employee[];
  error?: Failure;
}