import { PaginatedReceptions } from "../../domain/entities/paginated-receptions.entity";
import { Reception } from "../../domain/entities/reception.entity";
import { ReceptionModel } from "./reception.model";

export class PaginatedReceptionModel extends PaginatedReceptions {
  override toJson(): Map<string, any> {
    throw new Error("Method not implemented.");
  }

  static fromJson(data:Map<string,any>) : PaginatedReceptions {
    
    let items = this.getMappedReceptions(data.get("items"));

    return  {
      items: items,
      totalItems: data.get("total_items"),
      totalPages: data.get("total_pages"),
      hasNextPage: data.get("has_next_page"),
    } as PaginatedReceptions;
  }

  private static getMappedReceptions(data:any) : Reception[] {
    let receptions: Reception[] = [];

    for (const po of data) {
      let map = new Map<string,any>(Object.entries(po));
      let receptionMapped = ReceptionModel.fromJson(map);
      receptions.push(receptionMapped);
    }

    return receptions;
  }
}