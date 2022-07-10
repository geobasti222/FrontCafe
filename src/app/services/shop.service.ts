import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel, VariantModel } from '../models/productModel';
import { environment } from 'src/environments/environment';
import { Marker } from '../models/markerModel';


@Injectable({
    providedIn: 'root'
})
export class ShopService {

    protected url: string = 'https://localhost:44388';

    constructor(private http: HttpClient) { }

    public getShops(LatLong: string, idProducts: string): Promise<Marker[]> {
        return this.http.get<Marker[]>(this.url + '/SubShop/FindProduct/' + LatLong + '/' + environment.appCode + '/' + idProducts)
            .toPromise()
            .then(res => res)
            .catch(err => {
                return Promise.reject(err.json().error || 'Server error');
            });
    }

}