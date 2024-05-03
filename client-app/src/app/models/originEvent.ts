export interface OriginEvent {
  eventsId: string
  eventName: string
  eventDescription: any
}

export class OriginEventFormValues {
  eventsId: string = '';
  eventName: string = '';
  eventDescription: any = '';

  constructor(event?: OriginEventFormValues) {
    if (event) {
      this.eventsId = event.eventsId;
      this.eventName = event.eventName;
      this.eventDescription = event.eventDescription;
    }
  }
}
