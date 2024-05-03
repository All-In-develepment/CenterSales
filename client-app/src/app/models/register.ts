export interface Register {
  registerId: string
  registerDate: string
  registerTotal: number
  registerAmount: number
  registerAVG: number
  registerValue: number
  eventsId: string
  sellerId: string
  bookmakerId: string
}

export class RegisterFormValues {
  registerId: string = '';
  registerDate: string = '';
  registerTotal: number = 0;
  registerAmount: number = 0;
  registerAVG: number = 0;
  registerValue: number = 0;
  eventsId: string = '';
  sellerId: string = '';
  bookmakerId: string = '';

  constructor(register?: RegisterFormValues) {
    if(register){
      this.registerId = register.registerId;
      this.registerDate = register.registerDate;
      this.registerTotal = register.registerTotal;
      this.registerAmount = register.registerAmount;
      this.registerAVG = register.registerAVG;
      this.registerValue = register.registerValue;
      this.eventsId = register.eventsId;
      this.sellerId = register.sellerId;
      this.bookmakerId = register.bookmakerId;
    }
  }
}
