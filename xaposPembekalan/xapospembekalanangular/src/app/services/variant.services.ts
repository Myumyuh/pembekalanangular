import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Variant } from "../models/variant";
import { Config } from "../config/baseurl";

@Injectable({
    providedIn: 'root'
})

export class VariantService {
    constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  public getVariant(): Observable<Variant[]>{
    return this.http.get<Variant[]>(
      `${Config.url}/api/variant`,
      this.httpOptions
    )
  }

  public addVariant(variant: Variant): Observable<Variant>{
    return this.http.post<Variant>(`${Config.url}/api/addvariant`, variant, {
      ...this.httpOptions,
      responseType: 'text' as 'json'
    })
  }

  public updateVariant(variant: Variant): Observable<Variant>{
    return this.http.put<Variant>(`${Config.url}/api/updatevariant/${variant.id}`, variant, {
      ...this.httpOptions,
      responseType: 'text' as 'json'
    })
  }

  public deleteVariant(variant: Variant): Observable<Variant>{
    return this.http.put<Variant>(`${Config.url}/api/deletevariant/${variant.id}`, variant, {
      ...this.httpOptions,
      responseType: 'text' as 'json'
    })
  }

}