import { ProductModel, VariantModel } from "./productModel";

export class BuyModel{
    id: number;
    userId: number;
    date: Date;
    status: number;
    address: string;
    price: number;
    subShopId: number;
    paymentId: number;
    buyDetail: BuyDetailModel[];
}


export class BuyDetailModel{
    id: number;
    buyId: number;
    categoryProductId: number;
    unitPrice: number;
    quantity: number;
    timer : number;
    categoryProductMode :  VariantModel;
}
