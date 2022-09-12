import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel, VariantModel } from '../models/productModel';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    protected url: string = 'https://localhost:5001';

    constructor(private http: HttpClient) { }

    public getAllProducts(): Promise<any[]> {
        return this.http.get<any[]>(this.url + '/Admin/FindProductshop/' + environment.appCode)
            .toPromise()
            .then(res => res)
            .catch(err => {
                return Promise.reject(err.json().error || 'Server error');
            });
    }


    public getProductById(id: number): Promise<ProductModel> {
        return this.http.get<ProductModel>(this.url + '/SubShop/FindProductDetail/' + id + '/' + environment.appCode)
            .toPromise()
            .then(res => res)
            .catch(err => {
                return Promise.reject(err.json().error || 'Server error');
            });
    }

}