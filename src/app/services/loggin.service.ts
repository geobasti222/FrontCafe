import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfigModel } from '../models/configModel';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class LogginService {
    public config: ConfigModel =
        {
            logo: 'http://190.63.18.91/pngegg.png',
            background: 'http://190.63.18.91/background-minimal.jpg',
            primaryColor: '563517',
            secundaryColor: '9c6f44'
        };

    protected url: string = 'https://localhost:44388';

    constructor(private http: HttpClient) { }

    public getConfig(): ConfigModel {
        localStorage.setItem('config', JSON.stringify(this.config))
        return this.config;
    }


    // getConfig(): Promise<any> {
    //     return this.http.get<any>(this.url + '/Admin/FindConfigurationShop/' + environment.appCode)
    //         .toPromise()
    //         .then(res => res)
    //         .catch(err => {
    //             return Promise.reject(err.json().error || 'Server error');
    //         });
    //     // localStorage.setItem('config', JSON.stringify(data));
    //     // console.log(data);
    //     // return data;
    // }

}