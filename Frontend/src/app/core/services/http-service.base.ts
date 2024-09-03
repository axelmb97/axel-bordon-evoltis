import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Entity } from "../utils/entity";

export type DataConstraints = Entity | HttpParams | FormData;

export abstract class HttpServiceBase {
  abstract get(url: string, headers?: HttpHeaders): Promise<Map<string, any>>;
  abstract post(url: string, data: DataConstraints, headers?: HttpHeaders): Promise<Map<string, any>>;
  abstract put(url: string, data: DataConstraints, headers?: HttpHeaders): Promise<Map<string, any>>;
  abstract delete(url: string, headers?: HttpHeaders): Promise<Map<string, any>>;
}
