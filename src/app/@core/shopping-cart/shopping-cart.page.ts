import { Component, OnInit } from '@angular/core';
import { ConfigModel } from '../../models/configModel';
import { Marker } from '../../models/markerModel';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare let google;

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {

  shoppingCart: any[];
  configModel: ConfigModel;
  total = 0;
  map = null;

  markers: Marker[] = [];
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  constructor(private geolocation: Geolocation,
  ) { }

  ngOnInit() {
    this.configModel = JSON.parse(localStorage.getItem('config'));
    this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    this.shoppingCart.forEach(element => {
      this.total += element.price;
    });
    console.log(this.shoppingCart);
    this.getCurrentCoordinates();
  }

  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.loadMap();
    });
  }

  loadMap() {
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


}
