import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailPageRoutingModule } from './product-detail-routing.module';

import { ProductDetailPage } from './product-detail.page';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  imports: [
    NgxSkeletonLoaderModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailPageRoutingModule
  ],
  declarations: [ProductDetailPage],
})
export class ProductDetailPageModule { }
