import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../config/baseurl';
import { OrderHeader } from '../models/orderheader';
import { OrderDetails } from '../models/orderdetail';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow_Origin': '*',
    })
  }


  public addOrder(order: any): Observable<any> {
    return this.http.post<any>(`${Config.url}/api/addorders`, order, {
      ...this.httpOptions,
      responseType: 'text' as 'json'
    })
  }

  public getOrderHeader(): Observable<OrderHeader[]>{
    return this.http.get<OrderHeader[]>(
      `${Config.url}/api/getordersheader`,
      this.httpOptions
    )
  }
  public getCustomOrderDetails(headerid: number): Observable<OrderDetails[]>{
    return this.http.get<OrderDetails[]>(
      `${Config.url}/api/getordersdetail/${headerid}`,
      this.httpOptions
    )
  }
  public getOrderDetails(): Observable<OrderDetails[]>{
    return this.http.get<OrderDetails[]>(
      `${Config.url}/api/getordersdetail`,
      this.httpOptions
    )
  }
  
}
