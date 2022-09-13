import { Component, OnInit } from '@angular/core';
import { ConfigModel } from '../../models/configModel';
import { Marker } from '../../models/markerModel';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { BuyDetailModel, BuyModel } from 'src/app/models/buyModel';
import { ShopService } from 'src/app/services/shop.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  markers: Marker[] = [];
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  constructor(private geolocation: Geolocation,
    private loaderService : IonLoaderService,
    private router: Router,
    private shopService: ShopService

  ) { 
    this.configModel = JSON.parse(localStorage.getItem('config'));
    this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    this.buy = JSON.parse(localStorage.getItem('buy'));

  }

  ngOnInit() {
    this.loaderService.simpleLoader();
    this.shoppingCart.forEach(element => {
      this.total += element.price;
    });
    this.getCurrentCoordinates().then(  () => {
      this.loaderService.dismissLoader();
    });
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
        url: 'http://190.63.18.91/Person_icon.png',
        scaledSize: new google.maps.Size(50, 50)
      }
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
  }

  saveOrder(){
    this.loaderService.simpleLoader();
    this.buy.buyDetail = [];
    this.shoppingCart.forEach(element => {
        let item =  new BuyDetailModel();
        item.categoryProductId = element.categoryProductId;
        item.unitPrice = element.unitPrice;
        item.quantity = element.quantity;
        this.buy.buyDetail.push(item);
    });

    this.shopService.saveOrder(this.buy).then(data => {
        localStorage.setItem('order', JSON.stringify(data));
        this.loaderService.dismissLoader();
        this.router.navigate(['/home/order/' + data.id]);
        
    })
    
  }

}
