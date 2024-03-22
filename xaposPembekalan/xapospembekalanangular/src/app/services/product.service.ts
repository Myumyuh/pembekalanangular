import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../models/product";
import { Config } from "../config/baseurl";
import { NgForm } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})

export class ProductService{
    constructor (private http: HttpClient) {}

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    }

    public getProduct(): Observable<Product[]>{
        return this.http.get<Product[]>(
            `${Config.url}/api/product`,
            this.httpOptions
        )
    }
    public searchProduct(param): Observable<Product[]>{
        return this.http.get<Product[]>(
            `${Config.url}/api/search/product?name=${param.value.searchstr}&per_page=${param.value.perpage}&page=${param.value.page}`,
            this.httpOptions
        )
    }

    public addProduct(product: Product): Observable<Product>{
        return this.http.post<Product>(`${Config.url}/api/addproduct`, product, {
            ...this.httpOptions,
            responseType: 'text' as 'json'
        })
    }

    public editProduct(product: Product): Observable<Product>{
        return this.http.put<Product>(`${Config.url}/api/editproduct/${product.id}`, product, {
        ...this.httpOptions,
        responseType: 'text' as 'json'
        })
    }

    public deleteProduct(product: Product): Observable<Product>{
        return this.http.put<Product>(`${Config.url}/api/deleteproduct/${product.id}`, product, {
        ...this.httpOptions,
        responseType: 'text' as 'json'
    })
    }


}
