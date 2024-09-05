import { Clone } from "src/app/core/utils/clone";
import { Entity } from "src/app/core/utils/entity";
import { GetFilterPath } from "src/app/core/utils/get-path";

export abstract class ReceptionFilters extends Entity implements GetFilterPath, Clone<ReceptionFilters> {

  constructor(
    public page: number = 1,
    public pageSize: number = 5,
    public employeeName?: string,
    public from?: Date,
    public to?: Date,
  ) {
    super();
  }
  abstract clone(): ReceptionFilters;
  abstract getPath(): string;

}