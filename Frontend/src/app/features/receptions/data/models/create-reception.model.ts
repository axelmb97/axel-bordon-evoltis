import { CreateReception } from "../../domain/entities/create-reception.entity";

export class CreateReceptionModel extends CreateReception {
  override toJson(): Map<string, any> {
    let json = new Map<string,any>();
    json.set('purchase_order_id', this.purchaseOrderId);
    json.set('employee_id', this.employeeId);
    json.set('details', this.getDetails())

    return json;
  }

  private getDetails() : Map<string,any>[] {
    let details : Map<string,any>[] = [];

    for (const detail of this.details!) {
      details.push(detail.toJson());
    }

    return details;
  }
}