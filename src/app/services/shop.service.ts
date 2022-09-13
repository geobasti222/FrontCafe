import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel, VariantModel } from '../models/productModel';
import { environment } from 'src/environments/environment';
import { Marker } from '../models/markerModel';
import { BuyModel } from '../models/buyModel';
import { Order } from '../models/orderModel';


@Injectable({
    providedIn: 'root'
})
export class ShopService {

    protected url = 'https://localhost:5001';

    constructor(private http: HttpClient) { }

    public getShops(LatLong: string, idProducts: string): Promise<Marker[]> {
        return this.http.get<Marker[]>(this.url + '/SubShop/FindProduct/' + LatLong + '/' + environment.appCode + '/' + idProducts)
            .toPromise()
            .then(res => res)
            .catch(err => Promise.reject(err.error.json() || 'Server error'));
    }

    public saveOrder(buy : BuyModel): Promise<Order> {
        return this.http.post<Order>(this.url + '/Admin/SaveOrder',buy)
        .toPromise()
        .then(res => res)
        .catch(err => Promise.reject(err.error.json() || 'Server error'));
    }


}
