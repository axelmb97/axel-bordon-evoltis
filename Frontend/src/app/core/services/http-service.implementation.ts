import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { DataConstraints, HttpServiceBase } from "./http-service.base";
import { firstValueFrom } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class HttpService extends HttpServiceBase{
  
  constructor(private httpClient: HttpClient){
    super();
  }

  override async get(url: string, headers?: HttpHeaders): Promise<Map<string, any>> {
    let result = await firstValueFrom(this.httpClient.get<any>(url,{headers:headers}));
    let map = new Map<string, any>(Object.entries(result));
    return map;
  }
  override async post(url: string, data: DataConstraints, headers?: HttpHeaders): Promise<Map<string, any>> {
    let body = this.getBody(data);
    let result = await firstValueFrom(this.httpClient.post<any>(url, body, { headers: headers }));
    let map = new Map<string, any>(Object.entries(result));
    return map;
  }
  override async put(url: string, data: DataConstraints, headers?: HttpHeaders): Promise<Map<string, any>> {
    let body = this.getBody(data);        
    let result = await firstValueFrom(this.httpClient.put<any>(url, body, { headers: headers }));
    let map = new Map<string, any>(Object.entries(result));
    return map;
  }
  override async delete(url: string, headers?: HttpHeaders): Promise<Map<string, any>> {
    let result = await firstValueFrom(this.httpClient.delete<any>(url, { headers: headers }));
    let map = new Map<string, any>(Object.entries(result));
    return map;
  }

  private getBody(data: DataConstraints): any { 
    if (data instanceof HttpParams) return data;
    if (data instanceof FormData) return data;
    if (data instanceof Array) { 
      return data.map(map =>  this.getJson(map.toJson()));
    };
    return this.getJson(data.toJson());
  }
  
  private getJson(map: Map<string, any>): any {
    const json: { [key: string]: any } = {};
    map.forEach((value, key) => {
      json[key] = this.getValueByObject(value, key);
    });
    return json;
  }

  private getValueByObject(value:any, key:string): any { 
    if (value instanceof Map) {
      return this.getJson(value);
    }
    if (value instanceof Array) { 
      return  this.getArrayJson(value);
    } 
    return value;
  }

  private getArrayJson(values:any[]): any { 
    let arrayValues = [];
    for (const object of values) {
      if (object instanceof Map) {
        arrayValues.push(this.getJson(object));
      } else if (typeof object == 'string') {
        arrayValues.push(object);
      } else { 
        arrayValues.push(this.getArrayJson(object));
      }
    }
    return arrayValues;
  }
}