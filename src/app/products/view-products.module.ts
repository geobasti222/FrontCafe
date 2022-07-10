import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewProductsPage } from './view-products.page';

import { IonicModule } from '@ionic/angular';

import { ViewProductsPageRoutingModule } from './view-products-routing.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  imports: [
    NgxSkeletonLoaderModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ViewProductsPageRoutingModule
  ],
  declarations: [ViewProductsPage]
})
export class ViewProductsPageModule {}
