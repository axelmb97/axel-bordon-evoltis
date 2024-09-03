import { Injectable } from "@angular/core";
import { EmployeeRepositoryBase } from "../../domain/repositories/employee-base.repository";
import { Employee } from "../../domain/entities/employee.entity";
import { UnhandledFailure } from "src/app/core/failures/unhandled.failure";
import { EmployeeRemoteDataSourceBase } from "../data-sources/employee-remote.datasource";
import { Failure } from "src/app/core/failures/failure";

@Injectable()
export class EmployeeRepository extends EmployeeRepositoryBase {
  
  constructor(private employeeRemoteDataSource: EmployeeRemoteDataSourceBase){
    super();
  }

  override async getAll(): Promise<Employee[] | Failure> {
    try {
      return this.employeeRemoteDataSource.getAll();
    } catch (error:any) {
      return new UnhandledFailure();
    }
  }
}