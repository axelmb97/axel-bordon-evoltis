import { Supplier } from "src/app/features/suppliers/domain/entities/supplier.entity";
import { PurchaseOrder } from "../../domain/entities/purchase-order.entity";
import { SupplierModel } from "src/app/features/suppliers/data/models/supplier.model";
import { PurchaseOrderDetail } from "src/app/features/purchase-orders/domain/entities/purchase-order-detail.entity";
import { PurchaseOrderDetailModel } from "./purchase-order-detail.model";


export class PurchaseOrderModel extends PurchaseOrder {
  override toJson(): Map<string, any> {
    throw new Error("Method not implemented.");
  }

  static fromJson(data:Map<string,any>) : PurchaseOrder {
    let supplier = this.getMappedSupplier(data.get("supplier"));
    let details = this.getMappedDetails(data.get("details"));
    
    return new PurchaseOrderModel(
      data.get("id"),
      supplier,
      data.get("deliveryDate"),
      details
    );
  }

  private static getMappedSupplier(data:any) : Supplier {
    let map = new Map<string,any>(Object.entries(data));
    return SupplierModel.fromJson(map);
  }

  private static getMappedDetails(data:any) : PurchaseOrderDetail[] {
    let details: PurchaseOrderDetail[] = [];

    for (const detail of data) {
      let map = new Map<string,any>(Object.entries(detail));
      let detailMapped = PurchaseOrderDetailModel.fromJson(map);
      details.push(detailMapped)
    }

    return details;
  }
}