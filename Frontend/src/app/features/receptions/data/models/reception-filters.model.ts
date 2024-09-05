import { ReceptionFilters } from "../../domain/entities/reception-filters.entity";

export class ReceptionFiltersModel extends ReceptionFilters {

  override getPath(): string {
    let url = `?page=${this.page}&page_size=${this.pageSize}`;

    if(this.employeeName != undefined && this.employeeName.length > 0) {
      url += `&employee=${this.employeeName}`
    }

    return url;
  }

  override toJson(): Map<string, any> {
    throw new Error("Method not implemented.");
  }
}