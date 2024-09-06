import { PaginatedStock } from "../../domain/entities/paginated-stock.entity";
import { Stock } from "../../domain/entities/stock.entity";
import { StockModel } from "./stock.model";

export class PaginatedStockModel extends PaginatedStock {
  override toJson(): Map<string, any> {
    throw new Error("Method not implemented.");
  }

  static fromJson(data:any) : PaginatedStock {
    let items = this.getMappedStocks(data.get("items"));

    return  {
      items: items,
      totalItems: data.get("total_items"),
      totalPages: data.get("total_pages"),
      hasNextPage: data.get("has_next_page"),
    } as PaginatedStock;
  }

  private static getMappedStocks(data:any) : Stock[] {
    let stocks: Stock[] = [];

    for (const po of data) {
      let map = new Map<string,any>(Object.entries(po));
      let stockMapped = StockModel.fromJson(map);
      stocks.push(stockMapped);
    }

    return stocks;
  }
}