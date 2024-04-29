export interface Seller {
  sellerId: string;
  sellerName: string;
  sellerIsActive: boolean;
  projectId: string;
}

export class SellerFormValues {
  sellerId: string = "";
  sellerName: string = "";
  sellerIsActive: boolean = true;
  projectId: string = "";

  constructor(seller?: SellerFormValues) {
    if (seller) {
      this.sellerId = seller.sellerId;
      this.sellerName = seller.sellerName;
      this.sellerIsActive = seller.sellerIsActive;
      this.projectId = seller.projectId;
    }
  }
}
