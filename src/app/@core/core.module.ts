import { HomePage } from './home/home.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TranslateModule } from '@ngx-translate/core';

import { BrowserModule } from '@angular/platform-browser'
import { MapsPage } from './maps/maps.page';
import { ShoppingCartPage } from './shopping-cart/shopping-cart.page';

@NgModule({
  declarations: [HomePage,MapsPage,ShoppingCartPage],
  imports: [
    CoreRoutingModule,
    NgxSkeletonLoaderModule,
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
  ]
})
export class CoreModule { }
