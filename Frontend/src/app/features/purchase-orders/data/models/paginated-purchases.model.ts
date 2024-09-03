import { PaginatedPurchaseOrders } from "../../domain/entities/paginated-purchases.entity";
import { PurchaseOrder } from "../../domain/entities/purchase-order.entity";
import { PurchaseOrderModel } from "./purchase-order.model";

export class PaginatedPurchaseOrdersModel extends PaginatedPurchaseOrders {
  override toJson(): Map<string, any> {
    throw new Error("Method not implemented.");
  }

  static fromJson(data:Map<string,any>) : PaginatedPurchaseOrders {
    
    let items = this.getMappedPurchaseOrders(data.get("items"));

    return  {
      items: items,
      totalItems: data.get("total_items"),
      totalPages: data.get("total_pages"),
      hasNextPage: data.get("has_next_page"),
    } as PaginatedPurchaseOrders;
  }

  private static getMappedPurchaseOrders(data:any) : PurchaseOrder[] {
    let purchaseOrders: PurchaseOrder[] = [];

    for (const po of data) {
      let map = new Map<string,any>(Object.entries(po));
      let purchaseOrderMapped = PurchaseOrderModel.fromJson(map);
      purchaseOrders.push(purchaseOrderMapped);
    }

    return purchaseOrders;
  }
}