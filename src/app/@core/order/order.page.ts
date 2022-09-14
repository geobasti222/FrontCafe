import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/orderModel';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  order: Order;
  hours : string;
  minutes : string;
  seconds : string;
  constructor() {
    this.order = JSON.parse(localStorage.getItem('order'));
    localStorage.removeItem('shoppingCart');
    localStorage.removeItem('buy');
  }

  ngOnInit() {
    let string = '2020-01-01 ';    
    var date = new Date(string);
    date.setMinutes(date.getMinutes() +  this.order.timer - 1);
    var padLeft = n => "00".substring(0, "00".length - n.length) + n;
    var interval = setInterval(() => {

      this.hours = padLeft(date.getHours() + "");
      this.minutes = padLeft(date.getMinutes() + "");
      this.seconds = padLeft(date.getSeconds() + "");

      //console.log(hours, minutes, seconds);

      date = new Date(date.getTime() - 1000);
      if (this.minutes == '00' && this.seconds == '00') {
        clearInterval(interval);
      }

    }, 1000);
  }

}
