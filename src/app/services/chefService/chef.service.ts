import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chef } from 'src/app/models/Chef';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root'
})
export class ChefService extends ApiService<Chef> {

  constructor(httpClient: HttpClient) { 
    super(httpClient,'chef')
  }
}

