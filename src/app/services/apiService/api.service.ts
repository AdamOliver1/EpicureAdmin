import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import IModel from 'src/app/models/IModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService <T extends IModel> {
  url:string = 'http://localhost:8000/api/v1';
  constructor(
      private httpClient: HttpClient,
     ) {}
  
    public create(item: T,endpoint: string): Observable<T> {
      console.log(`${this.url}/${endpoint}`);
      console.log(item);
      
      return this.httpClient
        .post<T>(`${this.url}/${endpoint}`,item);    
    }
  
    public update(item: T,endpoint: string): Observable<T> {
      return this.httpClient
        .put<T>(`${this.url}/${endpoint}/${item._id}`,
         item)
    }
  
    readAll(endpoint: string): Observable<T[]> {
      return this.httpClient.get(`${this.url}/${endpoint}`) as Observable<T[]>;
    }

    readOne(id: number,endpoint:string): Observable<any> {
      return this.httpClient.get(`${this.url}/${endpoint}/${id}`)
    }
    
    public delete(id: number,endpoint:string) {
      console.log(`${this.url}/${endpoint}/disable/${id}`);
      
      return this.httpClient
        .put(`${this.url}/${endpoint}/disable/${id}`,{});
    }
  }