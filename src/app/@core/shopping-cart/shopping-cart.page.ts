import { Component, OnInit } from '@angular/core';
import { ConfigModel } from '../../models/configModel';
import { Marker } from '../../models/markerModel';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { BuyDetailModel, BuyModel } from 'src/app/models/buyModel';
import { ShopService } from 'src/app/services/shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/orderModel';
import { PaymentMethod } from 'src/app/models/paymentMethodModel';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

declare let google;

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {

  shoppingCart: any[];
  configModel: ConfigModel;
  buy: BuyModel;
  total = 0;
  map = null;

  order: Order;
  hours : string;
  minutes : string;
  seconds : string;
  finished: boolean = false;

  markers: Marker[] = [];
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude

  paymentMethods: Array<PaymentMethod>;
  form: FormGroup;

  constructor(private geolocation: Geolocation,
    private loaderService : IonLoaderService,
    private router: Router,
    private shopService: ShopService,
    private formBuilder: FormBuilder

  ) {
    this.buildForm();
    this.configModel = JSON.parse(localStorage.getItem('config'));
    this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    this.buy = JSON.parse(localStorage.getItem('buy'));
    this.order = JSON.parse(localStorage.getItem('order'));

    if((this.shoppingCart === null || this.buy === null) && (this.order === null || this.order === undefined)) {
        this.router.navigate(['/products']);
    }

  }

  ngOnInit() {
    this.loaderService.simpleLoader();
    if(this.shoppingCart !== null && this.buy === null){
      this.shoppingCart.forEach(element => {
        this.total += element.price;
      });
      this.getCurrentCoordinates().then(  () => {
        this.loaderService.dismissLoader();
      });
    }

    if(this.order !== null && this.order !== undefined){
      this.generateTimer();
      this.getCurrentCoordinates().then(  () => {
        this.loaderService.dismissLoader();
      });
    }
    this.getPaymentMethod();
  }

  async getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.loadMap().then(  () => {
        this.loaderService.dismissLoader();
      });
    });
  }

  async loadMap() {
    const mapEle: HTMLElement = document.getElementById('map');
    const myLatLng = { lat: parseFloat(this.latitude), lng: parseFloat(this.longitude) };

    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15,
      disableDefaultUI: true,
    });

    new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      title: 'Mi ubicación',
      icon: {
        url: 'https://conecta.lineadirectaec.com/img/Person_icon.png',
        scaledSize: new google.maps.Size(50, 50)
      }
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
  }

  saveOrder(){
    if(this.validForm()){
      this.buy.paymentId = Number(this.form.get('selectedPaymentMethod').value);
      this.buy.buyDetail = [];
      this.shoppingCart.forEach(element => {
          let item =  new BuyDetailModel();
          item.categoryProductId = element.category[0].id;
          item.unitPrice = element.category[0].price;
          item.quantity = element.quantity;
          item.timer  = element.category[0].time;
          this.buy.buyDetail.push(item);
      });
      if(JSON.parse(localStorage.getItem('order')) != null) {
          localStorage.removeItem('order');
      }
      this.shopService.saveOrder(this.buy).then(data => {
        if(data != null ) {
          this.order = data;
          this.generateTimer();
          localStorage.setItem('order', JSON.stringify(data));
          localStorage.removeItem('shoppingCart');
          localStorage.removeItem('buy');
          this.shoppingCart = null;
          this.buy = null;
          this.loaderService.dismissLoader();
          //this.router.navigate(['/home/order/' + data.id]);
        }
      });
    }
  }

  generateTimer(){
    let string = '2020-01-01 ';
    var date = new Date(string);
    // date.setMinutes(date.getMinutes() +  this.order.timer - 1);
    date.setMinutes(date.getMinutes() +  1);
    var padLeft = n => "00".substring(0, "00".length - n.length) + n;
    var interval = setInterval(() => {
      this.hours = padLeft(date.getHours() + "");
      this.minutes = padLeft(date.getMinutes() + "");
      this.seconds = padLeft(date.getSeconds() + "");

      date = new Date(date.getTime() - 1000);
      if (this.minutes == '00' && this.seconds == '00') {
        this.finished = true;
        clearInterval(interval);
      }

    }, 1000);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      selectedPaymentMethod: ['1']
    })
  }

  private getPaymentMethod() {
    this.shopService.getPaymentMethods().then(data => {
      if(!!data) {
        this.paymentMethods = data;
      }
    })
  }

  private validForm() {
    return !!this.form.get('selectedPaymentMethod').value && this.form.get('selectedPaymentMethod').value !== 0;
  }
}
