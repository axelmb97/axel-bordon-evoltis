import { Clone } from "src/app/core/utils/clone";
import { Entity } from "src/app/core/utils/entity";
import { GetFilterPath } from "src/app/core/utils/get-path";

export abstract class StockFilters extends Entity implements GetFilterPath, Clone<StockFilters> {


  constructor(
    public page: number = 1,
    public pageSize: number = 5,
    public productName?: string,
    public quantityGreaterThan?: number,
    public quantityLessThan?: number,
  ) {
    super();
  }

  abstract getPath(): string;
  abstract clone(): StockFilters;

}