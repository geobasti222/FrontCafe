import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/orderModel';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  order : Order;
  constructor() { 
    this.order = JSON.parse(localStorage.getItem('order'));

  }

  ngOnInit() {
  }

}
