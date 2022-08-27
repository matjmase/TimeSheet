export interface IClockEvent {
  Time: Date;
  ClockingIn: boolean;
  Purpose: string;
}

export class ClockEvent implements IClockEvent {
  Time: Date = new Date();
  ClockingIn: boolean = true;
  Purpose: string = '';
}
