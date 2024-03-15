import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { Config } from '../config/baseurl';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };  

  public getCategory(): Observable<Category[]>{
    return this.http.get<Category[]>(
      `${Config.url}/api/category`,
      this.httpOptions
    )
  }
  public addCategory(category: Category): Observable<Category>{
    return this.http.post<Category>(`${Config.url}/api/addcategory`, category, {
      ...this.httpOptions, 
      responseType: 'text' as 'json',
    })
  }
  public editCategory(category: Category): Observable<Category>{
    return this.http.put<Category>(`${Config.url}/api/updatecategory/${category.id}`, category, {
      ...this.httpOptions,
      responseType: 'text' as 'json'
    })
  }
  public deleteCategory(category: Category): Observable<Category>{
    return this.http.put<Category>(`${Config.url}/api/statusupdatecategory/${category.id}`, category, {
      ...this.httpOptions,
      responseType: 'text' as 'json'
    })
  }
}
