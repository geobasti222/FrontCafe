import { Component, OnInit } from '@angular/core';
import { ProductModel, VariantModel } from '../../models/productModel';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    public alertController: AlertController,
    private router: Router,
  ) { }




  ngOnInit() {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.configModel = JSON.parse(localStorage.getItem('config'));
    this.productsService.getProductById(id).then(product => {

      this.product = product;
      this.product.category[0].selectect = true;
      this.product.quantity = this.cantidad;
      this.firstName = this.product.nombre.substring(0, this.product.nombre.indexOf(' ')).toUpperCase();
      this.secondName = this.product.nombre.substring(this.product.nombre.indexOf(' ') + 1).toUpperCase();


      let shoppingCart = localStorage.getItem('shoppingCart');

      if (shoppingCart != undefined) {
        let productExist = JSON.parse(shoppingCart).find(x => x.id == this.product.id);
        if (productExist != undefined && productExist.category != undefined) {
          this.cantidad = productExist.quantity;
          this.product.quantity = productExist.quantity;
          this.product.category.forEach(element => {
            productExist.category.forEach(item => {
              if (item.id == element.id) {
                element.selectect = true;
              }
            });
          });
        }
      }
      this.shoppingCart();
    });
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
    if (!this.product.multipleSeleccion) {
      this.product.category.forEach(element => {
        element.selectect = false;
      });
    }
    variant.selectect = !variant.selectect;
    this.shoppingCart();
  }

  shoppingCart() {
    this.price = 0;
    this.product.category.forEach(element => {
      if (element.selectect) {
        this.price = this.price + element.price;
      }
    });
    this.price = this.price * this.cantidad;
  }

  addToCart(addMore: boolean) {

    const product = new ProductModel();
    product.id = this.product.id;
    product.nombre = this.product.nombre;
    product.tipoSeleccion = this.product.tipoSeleccion;
    product.quantity = this.product.quantity;
    product.price =  this.price;
    product.imagenReferencia =  this.product.imagenReferencia;
    product.category = this.product.category.filter(element => element.selectect);
    if (product.category === undefined || product.category.length === 0 || this.cantidad === 0) {
      this.presentAlert();
      return;
    } else {
      let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
      if (shoppingCart !== undefined || shoppingCart != null) {
        shoppingCart = shoppingCart.filter(element => element.id !== product.id);
      }else{
        shoppingCart = [];
      }
      shoppingCart.push(product);
      localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    }

    if (addMore) {
      this.router.navigate(['/products']);
    } else {
      this.router.navigate(['/home/maps']);
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
