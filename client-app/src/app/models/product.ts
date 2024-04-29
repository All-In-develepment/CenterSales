export interface Product {
  productId: string;
  productName: string;
  productDescription: any;
  productIsActive: boolean;
  productPrice: number;
}

export class ProductFormValues {
  productId: string = "";
  productName: string = "";
  productDescription: any = "";
  productIsActive: boolean = true;
  productPrice: number = 0;

  constructor(product?: ProductFormValues) {
    if (product) {
      this.productId = product.productId;
      this.productName = product.productName;
      this.productDescription = product.productDescription;
      this.productIsActive = product.productIsActive;
      this.productPrice = product.productPrice;
    }
  }
}
