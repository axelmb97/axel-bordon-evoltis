import { Entity } from "src/app/core/utils/entity";
import { Employee } from "src/app/features/employees/domain/entities/employee.entity";
import { ReceptionDeatil } from "./reception-detail.entity";

export abstract class Reception extends Entity {

  constructor(
    public id:number,
    public createdAt: string,
    public employee: Employee,
    public details: ReceptionDeatil[]
  ){
    super();
  }
}