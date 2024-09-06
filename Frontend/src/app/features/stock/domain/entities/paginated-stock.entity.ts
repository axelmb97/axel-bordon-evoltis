import { Entity } from "src/app/core/utils/entity";
import { Pagination } from "src/app/core/utils/pagination";
import { Stock } from "./stock.entity";

export abstract class PaginatedStock extends Entity implements Pagination<Stock> {
  items: Stock[] = [];
  totalItems: number = 0;
  totalPages: number = 0;
  hasNextPage: boolean = false;

}