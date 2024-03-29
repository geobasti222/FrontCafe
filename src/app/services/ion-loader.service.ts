import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class IonLoaderService {
  constructor(public loadingController: LoadingController) { }

  // Simple loader
  simpleLoader() {
    this.loadingController.create({
      message: 'Loading...'
    }).then((response) => {
      response.present();
    });
  }
  // Dismiss loader
  dismissLoader() {
    this.loadingController.dismiss().then((response) => {
    }).catch((err) => {
    });
  }
  // Auto hide show loader
  autoLoader() {
    this.loadingController.create({
      message: 'Loader hides after 4 seconds',
      duration: 4000
    }).then((response) => {
      response.present();
      response.onDidDismiss().then((response) => {
      });
    });
  }   
  // Custom style + hide on tap loader
  customLoader() {
    this.loadingController.create({
      message: 'Loader with custom style',
      duration: 4000,
      cssClass:'loader-css-class',
      backdropDismiss:true
    }).then((res) => {
      res.present();
    });
  }   
}