export interface IDatePicker {
  year: number;
  month: number;
  day: number;
}

export interface ITimePicker {
  hour: number;
  minute: number;
  second: number;
}

export interface IDateTimePicker {
  date: IDatePicker;
  time: ITimePicker;

  GetDate(): Date;
}

export class DateTimePicker implements IDateTimePicker {
  date: IDatePicker;
  time: ITimePicker;

  constructor(current: Date) {
    this.date = {
      year: current.getFullYear(),
      month: current.getMonth(),
      day: current.getDate(),
    };

    this.time = {
      hour: current.getHours(),
      minute: current.getMinutes(),
      second: current.getSeconds(),
    };
  }

  GetDate(): Date {
    return new Date(
      this.date.year,
      this.date.month,
      this.date.day,
      this.time.hour,
      this.time.minute,
      this.time.second
    );
  }
}
