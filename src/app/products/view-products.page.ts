import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, Message } from '../services/data.service';
import { ProductsService } from '../services/products.service';
import { ConfigModel } from '../models/configModel'
import { ProductModel } from '../models/productModel'

@Component({
  selector: 'app-view-message',
  templateUrl: './view-products.page.html',
  styleUrls: ['./view-products.page.scss'],
})
export class ViewProductsPage implements OnInit {
  slides: ProductModel[];

  constructor(
    private data: DataService,
    private router: Router,
    private productsService: ProductsService,
  ) { }
  logo: string;
  configModel: ConfigModel;

  ngOnInit() {    
    this.configModel = JSON.parse(localStorage.getItem('config'));
    this.productsService.getAllProducts().then(data => {      
      this.slides = data;
    });
  }

  productDetail(id: number) {
    this.router.navigate(['/productDetail/' + id]);
  }
}
