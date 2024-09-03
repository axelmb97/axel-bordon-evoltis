import { Injectable } from "@angular/core";
import { Employee } from "../../domain/entities/employee.entity";
import { environment } from "src/environments/environment.development";
import { EmployeeModel } from "../models/employee.model";
import { HttpServiceBase } from "src/app/core/services/http-service.base";

export abstract class EmployeeRemoteDataSourceBase {
  abstract getAll() : Promise<Employee[]>;
}

@Injectable()
export class EmployeeRemoteDataSource extends EmployeeRemoteDataSourceBase {

  private url: string = `${environment.apiUrl}/api/employees`;

  constructor(private httpService: HttpServiceBase){
    super();
  }

  override async getAll(): Promise<Employee[]> {
    let result = await this.httpService.get(this.url);
    return this.getMappedEmployees(result.get("response"));
  }

  private getMappedEmployees(data: any): Employee[] {
    let employees: Employee[]  = [];

    for (const employee of data) {
      let employeeMap = new Map<string,any>(Object.entries(employee));
      let employeeModel = EmployeeModel.fromJson(employeeMap);
      employees.push(employeeModel);
    }

    return employees;
  }
}