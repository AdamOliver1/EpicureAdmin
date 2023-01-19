import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Restaurant from 'src/app/models/Restaurant';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService extends ApiService<Restaurant> {

  constructor(httpClient: HttpClient) { 
    super(httpClient,'restaurant')
  }
}
