import { Injectable } from "@angular/core";
import { NoParams } from "src/app/core/utils/no-params";
import { UseCase } from "src/app/core/utils/usecase";
import { Employee } from "../entities/employee.entity";
import { EmployeeRepositoryBase } from "../repositories/employee-base.repository";
import { Failure } from "src/app/core/failures/failure";

@Injectable()
export class GetAllEmployeesUseCase implements UseCase<NoParams, Employee[]> {

  constructor(private employeeRepository: EmployeeRepositoryBase){}

  execute(param: NoParams): Promise<Employee[] | Failure> {
    return this.employeeRepository.getAll();
  }
}