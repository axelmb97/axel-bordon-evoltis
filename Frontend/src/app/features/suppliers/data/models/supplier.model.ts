import { Supplier } from "../../domain/entities/supplier.entity";

export class SupplierModel extends Supplier {
  override toJson(): Map<string, any> {
    throw new Error("Method not implemented.");
  }

  static fromJson(data:Map<string,any>) : Supplier {
    return new SupplierModel(
      data.get("id"),
      data.get("business_name"),
      data.get("address"),
      data.get("description")
    );
  }
}