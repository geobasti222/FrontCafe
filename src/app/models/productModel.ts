export class ProductModel{
    id: number;
    imagen: string;
    background: string;
    name: string;
    description: string;
    typesSelection: string;
    multiSelection: boolean;

    variants?: VariantModel[];
}

export class VariantModel{
    id : number;
    productId: number;
    logo: string;
    name: string;
    selectect : boolean;  
    price : number; 
}