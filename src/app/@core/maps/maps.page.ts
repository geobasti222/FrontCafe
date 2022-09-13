import { Component, OnInit } from '@angular/core';
import { ConfigModel } from '../../models/configModel';
import { ShopService } from '../../services/shop.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Marker } from '../../models/markerModel';
import { ActivatedRoute, Router } from '@angular/router';
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { BuyModel } from 'src/app/models/buyModel';

declare let google;


@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  map = null;

  markers: Marker[] = [];
  configModel: ConfigModel;
  size = '40%';
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  open = false;
  isPrograming = false;
  canDismiss = false;
  subShopSelected: Marker;
  constructor(
    private geolocation: Geolocation,
    private shopService: ShopService,
    private router: Router,
    private loaderService: IonLoaderService

  ) {
    this.configModel = JSON.parse(localStorage.getItem('config'));
  }

  ngOnInit() {
    this.loaderService.simpleLoader();
    this.getCurrentCoordinates().then(x => {
      this.loaderService.dismissLoader();
    });
  }

  async getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
      if (shoppingCart !== undefined) {
        const latLong = this.latitude + ',' + this.longitude;
        const idProducts = shoppingCart.map(item => item.id).join(',');
        this.shopService.getShops(latLong, idProducts).then(res => {
          this.markers = res.map(item => {
            return {
              position: {
                lat: parseFloat(item.position.lat.toString()),
                lng: parseFloat(item.position.lng.toString())
              }, name: item.name,
              id: item.id,
              address: item.address
            }
          });
          // console.log(this.markers);

          // for (let index = 0; index < 10; index++) {
          //   this.markers.push(this.markers[0]);
          // }
          this.loadMap().then(x => {
            this.loaderService.dismissLoader();
          });
        });
      }
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  changeSize() {
    this.size = this.size === '40%' ? '70%' : '40%';
  }

  async loadMap() {
    const mapEle: HTMLElement = document.getElementById('map');
    const myLatLng = { lat: parseFloat(this.latitude), lng: parseFloat(this.longitude) };

    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 17,
      disableDefaultUI: true,
    });

    new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      title: 'Mi ubicación',
      icon: {
        url: 'https://conecta.lineadirectaec.com/img/Material/ico-aquiestas.svg',
        // url: 'http://190.63.18.91/Person_icon.png',
        scaledSize: new google.maps.Size(50, 50)
      }
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.renderMarkers();
    });
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.name,
      id: marker.id,
      address: marker.address,
      icon: {
        url: 'https://conecta.lineadirectaec.com/img/Material/pin.svg',
        scaledSize: new google.maps.Size(30, 30)
      }
    });
  }

  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }

  selectedMarker(marker: Marker) {
    console.log(marker, this.open);
    this.subShopSelected = marker;
    // this.open = false;
    this.open = true;
  }

  isProgramingSelected(value: boolean) {
    console.log(value);
    this.isPrograming = value;
  }

  generate() {
    this.canDismiss = true;

    let buy = new BuyModel();
    buy.userId = 1;
    buy.subShopId = this.subShopSelected.id;
    buy.address = this.subShopSelected.address;

    if(localStorage.getItem('buy') !== null || localStorage.getItem('buy') !== undefined) {
      localStorage.removeItem('buy');
    }
    localStorage.setItem('buy', JSON.stringify(buy));

    this.router.navigate(['/home/shopping-cart']);
  }

  back() {
    this.router.navigate(['/products']);
  }



}
