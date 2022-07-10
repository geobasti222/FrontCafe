export class ProductModel{
    id: number;
    imagenReferencia: string;
    imagenFondo: string;
    nombre: string;
    descripcion: string;
    tipoSeleccion: string;
    multipleSeleccion: boolean;
    quantity?: number;
    price?: number;

    category?: VariantModel[];
}

export class VariantModel{
    id : number;
    productId: number;
    logo: string;
    name: string;
    selectect : boolean;  
    price : number; 
    time? : number;
}