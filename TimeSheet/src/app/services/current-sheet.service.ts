import { Injectable } from '@angular/core';
import { IClockEvent } from '../models/IClockEvent';

@Injectable({
  providedIn: 'root',
})
export class CurrentSheetService {
  private events: IClockEvent[] = [];

  constructor() {}

  public GetEvents() {
    return [...this.events];
  }

  public UpdateEvents(events: IClockEvent[]) {
    this.events = [...events];
  }
}
