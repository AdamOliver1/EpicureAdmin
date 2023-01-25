import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment/environment";
import { Observable } from "rxjs";
import IModel from "src/app/models/IModel";

@Injectable({
  providedIn: "root",
})
export class ApiService<T extends IModel> {

  private url = environment.apiKey;
  constructor(private httpClient: HttpClient) {}

   create(item: T, endpoint: string): Observable<T> {
    return this.httpClient.post<T>(`${this.url}/${endpoint}`, item);
  }

   update(item: T, endpoint: string): Observable<T> {
    return this.httpClient.put<T>(`${this.url}/${endpoint}/${item._id}`, item);
  }

  readAll(endpoint: string): Observable<T[]> {
    return this.httpClient.get(`${this.url}/${endpoint}`) as Observable<T[]>;
  }

  get(endpoint: string): Observable<any> {
    return this.httpClient.get(`${this.url}/${endpoint}`) as Observable<any>;
  }

  readOne(id: number, endpoint: string): Observable<any> {
    return this.httpClient.get(`${this.url}/${endpoint}/${id}`);
  }

   delete(id: number, endpoint: string) {
    return this.httpClient.put(`${this.url}/${endpoint}/disable/${id}`, {});
  }
}
