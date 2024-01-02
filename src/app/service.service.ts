import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }

  postData(user:any){
   return  this.http.post('http://localhost:3000/convert',user);
  }
}
