import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfigModel } from '../models/configModel';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class LogginService {

    protected url: string = 'https://localhost:44388';

    constructor(private http: HttpClient) { }

    getConfig(): Promise<any> {
        return this.http.get<any>(this.url + '/Admin/FindConfigurationShop/' + environment.appCode)
            .toPromise()
            .then(res => res)
            .catch(err => {
                return Promise.reject(err.json().error || 'Server error');
            });
    }

}