import { Employee } from "../../domain/entities/employee.entity";

export class EmployeeModel extends Employee {
  override toJson(): Map<string, any> {
    throw new Error("Method not implemented.");
  }

  static fromJson(data:Map<string,any>) : Employee {
    return new EmployeeModel(
      data.get("id"),
      data.get("name"),
      data.get("last_name"),
      data.get("phone_number")
    );
  }
}