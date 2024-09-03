import { Failure } from "src/app/core/failures/failure";
import { Employee } from "../entities/employee.entity";

export abstract class EmployeeRepositoryBase {
  abstract getAll() : Promise<Employee[] | Failure>;
}