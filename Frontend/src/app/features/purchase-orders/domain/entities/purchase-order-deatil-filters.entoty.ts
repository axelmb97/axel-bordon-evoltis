import { Entity } from "src/app/core/utils/entity";
import { GetFilterPath } from "src/app/core/utils/get-path";

export abstract class PurchaseOrderDetailFilters extends Entity implements GetFilterPath {

  constructor(
    public page: number = 1,
    public pageSize: number = 5
  ){
    super();
  }
  abstract getPath(): string;
}