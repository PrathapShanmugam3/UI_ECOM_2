import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Signupentity } from './app/signup/signupentity';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http:HttpClient) { }
  
  // baseurl="https://foodappapi-b7ig.onrender.com";
 // "https://foodapi-mq1q.onrender.com";
 //https://server-ecom-2.onrender.com/

 baseurl="https://server-ecom-2.onrender.com";
  post(path:any,data:any):Observable<any>{
    return this.http.post(this.baseurl+path,data)
  }
  get(path:any):Observable<any>{
    return this.http.get(this.baseurl+path);
  }
  delete(path:any):Observable<any>{
    return this.http.delete(this.baseurl+path);
  }
  put(path:any,data:any):Observable<any>{
    return this.http.put(this.baseurl+path,data)
  }
  sigPpost(data:any):Observable<Signupentity>{
    return this.http.post<Signupentity>(this.baseurl+'/user/save',data)
  }

  postProduct(formData: FormData): Observable<any> {
    return this.http.post(this.baseurl + '/products/', formData);
  }
  postCategory(path: string, data: any): Observable<any> {
    return this.http.post<any>(this.baseurl + '/category/save', data);
  }


  customDataGetData(path:any,data:any){
    return this.http.post<any>(this.baseurl+path,data);
  }
    
  }
  