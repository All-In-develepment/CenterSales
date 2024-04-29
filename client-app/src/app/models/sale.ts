export interface Sale {
  saleId: string
  productId: string
  productName: string
  sellerId: string
  sellerName: string
  projectId: string
  projectName: string
  salePrice: number
  saleDate: string
}

export class SaleFormValues
{
  saleId: string = '';
  productId: string = '';
  productName: string = '';
  sellerId: string = '';
  sellerName: string = '';
  projectId: string = '';
  projectName: string = '';
  salePrice: number = 0;
  saleDate: string = '';

  constructor(sale?: SaleFormValues) {
    if (sale) {
      this.saleId = sale.saleId;
      this.productId = sale.productId;
      this.productName = sale.productName;
      this.sellerId = sale.sellerId;
      this.sellerName = sale.sellerName;
      this.projectId = sale.projectId;
      this.projectName = sale.projectName;
      this.salePrice = sale.salePrice;
      this.saleDate = sale.saleDate;
    }
  }
}