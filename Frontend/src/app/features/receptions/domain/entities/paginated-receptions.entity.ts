import { Entity } from "src/app/core/utils/entity";
import { Pagination } from "src/app/core/utils/pagination";
import { Reception } from "./reception.entity";

export abstract class PaginatedReceptions extends Entity implements Pagination<Reception> {
  items: Reception[] = [];
  totalItems: number = 0;
  totalPages: number = 0;
  hasNextPage: boolean = false;
}