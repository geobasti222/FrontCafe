import { Injectable } from '@angular/core';
import { ConfigModel } from '../models/configModel';


@Injectable({
    providedIn: 'root'
})
export class LogginService {
    public config: ConfigModel = 
        {
            logo : 'http://190.63.18.91/pngegg.png',
            background : 'http://190.63.18.91/background-minimal.jpg',
            primaryColor : '563517',
            secundaryColor : '9c6f44' 
        };
    constructor() { }

    public getConfig(): ConfigModel {
        localStorage.setItem('config', JSON.stringify(this.config))
        return this.config;
    }

}