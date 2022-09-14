import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/orderModel';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  order: Order;
  constructor() {
    this.order = JSON.parse(localStorage.getItem('order'));

  }

  ngOnInit() {
    let string2 = '2020-01-01 ' + this.decimalAHora(20);
    let string = '2020-01-01 ' + '01:59:10';
    console.log(string,string2);
    
    var date = new Date(string2);

    // var date = new Date('2020-01-01 00:05:10');

    // Función para rellenar con ceros
    var padLeft = n => "00".substring(0, "00".length - n.length) + n;

    // Asignar el intervalo a una variable para poder eliminar el intervale cuando llegue al limite
    var interval = setInterval(() => {

      var hours = padLeft(date.getHours() + "");
      // Asignar el valor de minutos
      var minutes = padLeft(date.getMinutes() + "");
      // Asignqr el valor de segundos
      var seconds = padLeft(date.getSeconds() + "");

      console.log(hours, minutes, seconds);

      // Restarle a la fecha actual 1000 milisegundos
      date = new Date(date.getTime() - 1000);

      // Si llega a 2:45, eliminar el intervalo
      if (minutes == '00' && seconds == '00') {
        clearInterval(interval);
      }

    }, 1000);
  }


  decimalAHora(decimal : number) {
      let horas = 0;
      if(decimal / 60 >= 1){
        horas = Math.floor(Math.trunc(decimal)); // Obtenemos la parte entera
      }
      let restoHoras = Math.floor(decimal % 1 * 100); // Obtenemos la parde decimal
      let decimalMinutos = restoHoras * 60 / 100 ; // Obtenemos los minutos expresado en decimal
  
    //   minutos = Math.floor(decimalMinutos), // Obtenemos la parte entera
    //   restoMins = Math.floor(decimalMinutos % 1 * 100), // Obtenemos la parde decimal
    //   segundos = Math.floor(restoMins * 60 / 100); // Obtenemos los segundos expresado en entero
  
    // return `${('00'+horas).slice(-2)}:${('00'+minutos).slice(-2)}:${('00'+segundos).slice(-2)}`;
    console.log(decimal / 60 , horas, decimalMinutos);

    return decimal;
  }
  


}
