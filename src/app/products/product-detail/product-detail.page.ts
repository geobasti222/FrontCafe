import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/productModel';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigModel } from '../../models/configModel'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  product: ProductModel;
  firstName: string;
  secondName: string;
  configModel: ConfigModel;
  splitted: string[];
  cantidad : number = 1;

  constructor(
    public productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) { }




  ngOnInit() {    
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.configModel = JSON.parse(localStorage.getItem('config'));
    this.product = this.productsService.getProductById(id);
    this.firstName = this.product.name.substring(0, this.product.name.indexOf(' ')); 
    this.secondName = this.product.name.substring(this.product.name.indexOf(' ') + 1);
  }

  modifyQuantity(bool : boolean){    
      if(bool){
        this.cantidad =  this.cantidad + 1;
      }else if(!bool && this.cantidad > 0){
        this.cantidad =  this.cantidad - 1;
      }    
  }

}
