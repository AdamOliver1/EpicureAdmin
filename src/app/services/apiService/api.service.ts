import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import IModel from 'src/app/models/IModel';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService <T extends IModel> {
  url:string = 'http://localhost:8000/api/v1';
  constructor(
      private httpClient: HttpClient,
      private endpoint: string,
     ) {}
  
    public create(item: T): Observable<T> {
      console.log(`${this.url}/${this.endpoint}`);
      console.log(item);
      
      return this.httpClient
        .post<T>(`${this.url}/${this.endpoint}`,item);    
    }
  
    public update(item: T): Observable<T> {
      return this.httpClient
        .put<T>(`${this.url}/${this.endpoint}/${item._id}`,
         item)
    }
  
    readAll(): Observable<any> {
      return this.httpClient.get(`${this.url}/${this.endpoint}`)
     
    }
    readOne(id: number): Observable<any> {
      return this.httpClient.get(`${this.url}/${this.endpoint}/${id}`)
     
    }
    
    delete(id: number) {
      return this.httpClient
        .delete(`${this.url}/${this.endpoint}/${id}`);
    }
  }