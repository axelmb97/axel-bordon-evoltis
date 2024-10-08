import { Clone } from "src/app/core/utils/clone";
import { Entity } from "src/app/core/utils/entity";
import { GetFilterPath } from "src/app/core/utils/get-path";


export abstract class PurchaseOrderFilters extends Entity implements GetFilterPath, Clone<PurchaseOrderFilters> {

  constructor(
    public page: number = 1,
    public pageSize: number = 5,
    public businessName?: string,
    public from?: Date,
    public to?: Date,
  ) {
    super();
  }

   abstract getPath(): string;
   abstract clone() : PurchaseOrderFilters;
}