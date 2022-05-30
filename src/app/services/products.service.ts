import { Injectable } from '@angular/core';
import { ProductModel, VariantModel } from '../models/productModel';


@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    public slides: ProductModel[] =
        [
            {
                id: 1,
                name: 'CAFÉ CON LECHE',
                typesSelection: 'TIPO DE LECHE',
                imagen: 'http://190.63.18.91/imagen-vaso.png',
                background: 'http://190.63.18.91/cafe_con_leche.jpg',
                description: 'Nosotros creemos que el cafe debe ser tan simple o complejo como tu quieras.',
                multiSelection: true,

                variants: [
                    {
                        id : 1,
                        logo : 'http://190.63.18.91/BotellaLeche.png',
                        name : 'REGULAR',
                        productId : 1,
                        selectect : true,
                        price : 2.5
                    },
                    {
                        id : 2,
                        logo : 'http://190.63.18.91/BotellaLeche.png',
                        name : 'DESLACTOSADA',
                        productId : 1,
                        selectect : false,
                        price : 5
                    },
                    {
                        id : 3,
                        logo : 'http://190.63.18.91/BotellaLeche.png',
                        name : 'ALMENDRA',
                        productId : 1,
                        selectect : false,
                        price : 5.5
                    },
                    {
                        id : 4,
                        logo : 'http://190.63.18.91/BotellaLeche.png',
                        name : 'AVENA',
                        productId : 1,
                        selectect : false,
                        price : 1
                    }
                ]
            },
            {
                id: 2,
                name: 'CAFÉ TINTO',
                typesSelection: 'TIPO DE XKS',
                imagen: 'http://190.63.18.91/icono-vaso.png',
                background: 'http://190.63.18.91/cafe_tinto-2.jpg',
                description: 'Nosotros creemos que el cafe debe ser tan simple o complejo como tu quieras.',
                multiSelection: true,
            }
        ];
    constructor() { }

    public getAllProducts(): ProductModel[] {
        return this.slides;
    }


    public getProductById(id: number): ProductModel {
        return this.slides.find(x => x.id == id);
    }

}