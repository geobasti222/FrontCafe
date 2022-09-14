import { Component, OnInit } from '@angular/core';
import { DataService, Message } from '../../services/data.service';
import { Router } from '@angular/router';

import { LogginService } from '../../services/loggin.service';

import { ConfigModel } from '../../models/configModel';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  configModel: ConfigModel;
  constructor(
    private data: DataService,
    private router: Router,
    private logginService: LogginService
  ) {
    this.configModel = JSON.parse(localStorage.getItem('config'));
    console.log(this.configModel);
    
    if (this.configModel === null || this.configModel === undefined) {
      this.logginService.getConfig().then((data) => {
        console.log(data);
        
        this.configModel = data;
        localStorage.setItem('config', JSON.stringify(data));
      });
    }
  }

  ngOnInit() {

  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  products() {
    this.router.navigate(['/products']);
  }
}
