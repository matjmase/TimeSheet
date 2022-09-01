import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeformat',
})
export class TimeformatPipe implements PipeTransform {
  transform(value: Date, ...args: unknown[]): string {
    return `${this.Pad(value.getHours().toString(), 2)}:${this.Pad(
      value.getMinutes().toString(),
      2
    )}:${this.Pad(value.getSeconds().toString(), 2)}`;
  }
  Pad(num: string, digits: number) {
    num = num.toString();
    while (num.length < digits) num = '0' + num;
    return num;
  }
}
