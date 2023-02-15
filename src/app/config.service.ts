import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Data} from './message'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  constructor(private http:HttpClient) { }
  url="http://localhost:3000/"
  //url="https://jsonplaceholder.typicode.com/users"
  
  getData(): Observable<Data[]>{
    return this.http.get<Data[]>(this.url)
    
  }
}
