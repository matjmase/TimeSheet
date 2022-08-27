import { Subject } from 'rxjs';

export class ModalFormModel<T> {
  private close = new Subject<T>();
  private open = new Subject<T>();

  InitOpen(input: T) {
    this.open.next(input);
  }

  OnOpen() {
    return this.open;
  }

  InitClose(input: T) {
    this.close.next(input);
  }

  OnClose() {
    return this.close;
  }
}
