import { Component, OnInit } from '@angular/core';
import { ProductModel, VariantModel } from '../../models/productModel';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigModel } from '../../models/configModel'
import { AlertController } from '@ionic/angular';

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
  cantidad: number = 1;
  price: number = 0;

  constructor(
    public productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController
  ) { }




  ngOnInit() {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.configModel = JSON.parse(localStorage.getItem('config'));
    this.product = this.productsService.getProductById(id);
    this.product.variants[0].selectect = true;
    this.product.quantity = this.cantidad;
    this.firstName = this.product.name.substring(0, this.product.name.indexOf(' '));
    this.secondName = this.product.name.substring(this.product.name.indexOf(' ') + 1);


    let shoppingCart = localStorage.getItem('shoppingCart');
    console.log(shoppingCart);

    if (shoppingCart != undefined) {
      let productExist = JSON.parse(shoppingCart).find(x => x.id == this.product.id);
      if (productExist != undefined) {
        this.cantidad = productExist.quantity;
        this.product.quantity = productExist.quantity;
        this.product.variants.forEach(element => {
          productExist.variants.forEach(item => {
            if (item.id == element.id) {
              element.selectect = true;
            }
          });
        });
      }
    }
    this.shoppingCart();
  }

  modifyQuantity(bool: boolean) {
    if (bool) {
      this.cantidad = this.cantidad + 1;
    } else if (!bool && this.cantidad > 0) {
      this.cantidad = this.cantidad - 1;
    }
    this.product.quantity = this.cantidad;
    this.shoppingCart();
  }

  selectedVariant(variant: VariantModel) {
    if (!this.product.multiSelection) {
      this.product.variants.forEach(element => {
        element.selectect = false;
      });
    }
    variant.selectect = !variant.selectect;
    this.shoppingCart();
  }

  shoppingCart() {
    this.price = 0;
    this.product.variants.forEach(element => {
      if (element.selectect) {
        this.price = this.price + element.price;
      }
    });
    this.price = this.price * this.cantidad;
  }

  addToCart() {
    let product = new ProductModel();
    product.id = this.product.id;
    product.name = this.product.name;
    product.typesSelection = this.product.typesSelection;
    product.quantity = this.product.quantity;
    product.variants = this.product.variants.filter(element => element.selectect);
    if (product.variants == undefined || product.variants.length == 0 || this.cantidad == 0) {
      this.presentAlert();
      return;
    } else {
      let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
      shoppingCart = shoppingCart.filter(element => element.id != product.id);
      shoppingCart.push(product);
      console.log(shoppingCart);

      localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
    }


  }

  async presentAlert() {
    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      //subHeader: 'Subtitle',
      message: 'Seleccione una variante',
      buttons: ['OK']
    });
    if (this.cantidad == 0) {
      alert.message = 'Seleccione una cantidad';
    }

    await alert.present();
  }

}
