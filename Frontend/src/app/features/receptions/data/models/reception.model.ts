import { Employee } from "src/app/features/employees/domain/entities/employee.entity";
import { Reception } from "../../domain/entities/reception.entity";
import { EmployeeModel } from "src/app/features/employees/data/models/employee.model";
import { ReceptionDeatil } from "../../domain/entities/reception-detail.entity";
import { ReceptionDetailModel } from "./reception-detail.model";

export class ReceptionModel extends Reception {

  override toJson(): Map<string, any> {
    throw new Error("Method not implemented.");
  }

  static fromJson(data:any) : Reception {
    let employee = this.getMappedEmployee(data.get("employee"));
    let details = this.getMappedDetails(data.get("details"));
    return new ReceptionModel(
      data.get("id"),
      data.get("createdAt"),
      employee,
      details
    );
  }

  private static getMappedEmployee(data:any) : Employee {
    let map = new Map<string,any>(Object.entries(data));
    return EmployeeModel.fromJson(map);
  }

  private static getMappedDetails(data:any): ReceptionDeatil[] {
    let receptionDetails: ReceptionDeatil[] = [];

    for (const detail of data) {
      let map = new Map<string,any>(Object.entries(detail));
      let receptionMapped = ReceptionDetailModel.fromJson(map);
      receptionDetails.push(receptionMapped);
    }

    return receptionDetails;
  }
}