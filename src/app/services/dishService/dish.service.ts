import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Dish from 'src/app/models/Dish';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root'
})
export class DishService extends ApiService<Dish> {

  constructor(httpClient: HttpClient) { 
    super(httpClient,'dish')
  }
}