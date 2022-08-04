import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfigModel } from '../models/configModel';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class LogginService {

    protected url = 'https://localhost:44388';

    constructor(private http: HttpClient) { }

    getConfig(): Promise<any> {
        return this.http.get<any>(this.url + '/Admin/FindConfigurationShop/' + environment.appCode)
            .toPromise()
            .then(res => res)
            .catch(err => Promise.reject(err.error.json() || 'Server error'));
    }

}
