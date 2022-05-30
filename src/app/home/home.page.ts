import { Component, OnInit } from '@angular/core';
import { DataService, Message } from '../services/data.service';
import { Router } from '@angular/router';

import { LogginService } from '../services/loggin.service'

import { ConfigModel } from '../models/configModel'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



export class HomePage {
  constructor(
    private data: DataService,
    private router: Router,
    private logginService : LogginService) {
  }

  configModel : ConfigModel;

  ngOnInit() {
    this.configModel = this.logginService.getConfig();  
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
    //window.location.reload();
  }

}
