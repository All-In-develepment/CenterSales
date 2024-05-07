export interface Register {
  registerId: string
  registerDate: string
  registerTotal: number
  registerAmount: number
  registerAVG: number
  registerLeads: number
  registerAVGConversion: number
  eventsId: string
  eventsName: string
  sellerId: string
  sellerName: string
  bookmakerId: string
  bookmakerName: string
  projectId: string
  projectName: string
}

export class RegisterFormValues {
  registerId: string = '';
  registerDate: string = '';
  registerTotal: number = 0;
  registerAmount: number = 0;
  registerAVG: number = 0;
  registerLeads: number = 0;
  registerAVGConversion: number = 0;
  eventsId: string = '';
  eventsName: string = '';
  sellerId: string = '';
  sellerName: string = '';
  bookmakerId: string = '';
  bookmakerName: string = '';
  projectId: string = '';
  projectName: string = '';

  constructor(register?: RegisterFormValues) {
    if(register){
      this.registerId = register.registerId;
      this.registerDate = register.registerDate;
      this.registerTotal = register.registerTotal;
      this.registerAmount = register.registerAmount;
      this.registerAVG = register.registerAVG;
      this.registerLeads = register.registerLeads;
      this.registerAVGConversion = register.registerAVGConversion;
      this.eventsId = register.eventsId;
      this.eventsName = register.eventsName;
      this.sellerId = register.sellerId;
      this.sellerName = register.sellerName;
      this.bookmakerId = register.bookmakerId;
      this.bookmakerName = register.bookmakerName;
      this.projectId = register.projectId;
      this.projectName = register.projectName;
    }
  }
}
