import { PaginatedPurchaseOrderDetails } from "../../domain/entities/paginated-purchase-order-details.entity";
import { PurchaseOrderDetail } from "../../domain/entities/purchase-order-detail.entity";
import { PurchaseOrderDetailModel } from "./purchase-order-detail.model";

export class PaginatedPurchaseOrderDetailsModel extends PaginatedPurchaseOrderDetails{
  override toJson(): Map<string, any> {
    throw new Error("Method not implemented.");
  }

  static fromJson(data:any) : PaginatedPurchaseOrderDetails {
    let items : PurchaseOrderDetail[] = this.getMappedPurchaseOrderDetails(data.get('items'));

    return  {
      items: items,
      totalItems: data.get("total_items"),
      totalPages: data.get("total_pages"),
      hasNextPage: data.get("has_next_page"),
    } as PaginatedPurchaseOrderDetails;
  }

  private static getMappedPurchaseOrderDetails(data:any) : PurchaseOrderDetail[] {
    let purchaseOrders: PurchaseOrderDetail[] = [];

    for (const detail of data) {
      let map = new Map<string,any>(Object.entries(detail));
      let purchaseOrderMapped = PurchaseOrderDetailModel.fromJson(map);
      purchaseOrders.push(purchaseOrderMapped);
    }

    return purchaseOrders;
  }
}