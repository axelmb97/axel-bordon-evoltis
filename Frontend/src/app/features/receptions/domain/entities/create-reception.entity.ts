import { Entity } from "src/app/core/utils/entity";
import { CrateReceptionDetail } from "./crate-reception-details.entity";

export abstract class CreateReception extends Entity {

  constructor(
    public purchaseOrderId: number,
    public employeeId: number,
    public details: CrateReceptionDetail[]
  ){
    super();
  }
}