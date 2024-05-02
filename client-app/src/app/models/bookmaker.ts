export interface Bookmaker {
  bookmakerId: string;
  bookmakerName: string;
}

export class BookmakerFormValues {
  bookmakerId: string = '';
  bookmakerName: string = '';

  constructor(bookmaker?: BookmakerFormValues) {
    if (bookmaker) {
      this.bookmakerId = bookmaker.bookmakerId;
      this.bookmakerName = bookmaker.bookmakerName;
    }
  }
}