import { Component, OnInit } from '@angular/core';
import { ConfigModel } from '../../models/configModel';
import { ShopService } from '../../services/shop.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Marker } from '../../models/markerModel';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(
    private geolocation: Geolocation,
    private shopService: ShopService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.configModel = JSON.parse(localStorage.getItem('config'));
    this.getCurrentCoordinates();
  }

  getCurrentCoordinates() {
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
              id : item.id
            }
          });
          // for (let index = 0; index < 10; index++) {
          //   this.markers.push(this.markers[0]);
          // }
          this.loadMap();
        });
      }
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  changeSize() {
    this.size = this.size === '40%' ? '70%' : '40%';
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
      this.renderMarkers();
    });
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.name,
      icon: {
        url: 'assets/icon/favicon.png',
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
    console.log(marker,this.open);
    // this.open = false;
    this.open = true;
  }

  isProgramingSelected(value: boolean){
    console.log(value);

    this.isPrograming = value;
  }

  generate(){
    this.canDismiss = true;

    this.router.navigate(['/home/shopping-cart']);
  }



}
