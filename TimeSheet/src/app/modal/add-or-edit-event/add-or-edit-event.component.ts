import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  NgbCalendar,
  NgbDate,
  NgbDatepicker,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { filter, Subscription } from 'rxjs';
import { ClockEvent, IClockEvent } from 'src/app/models/IClockEvent';
import {
  DateTimePicker,
  IDateTimePicker,
} from 'src/app/models/IDateTimePicker';
import { ModalFormModel } from '../ModalFormModel';

@Component({
  selector: 'app-add-or-edit-event',
  templateUrl: './add-or-edit-event.component.html',
  styleUrls: ['./add-or-edit-event.component.scss'],
})
export class AddOrEditEventComponent implements OnInit, OnDestroy {
  @ViewChild('modal')
  private modalContent!: TemplateRef<AddOrEditEventComponent>;
  private modalRef!: NgbModalRef;

  @Input() Communicate!: ModalFormModel<IClockEvent>;

  sub: Subscription | undefined;

  model: IClockEvent = new ClockEvent();

  picker: IDateTimePicker = new DateTimePicker(new Date());

  constructor(private router: Router, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((val): val is NavigationEnd => val instanceof NavigationEnd))
      .subscribe({
        next: (val) => this.Close(),
      });

    this.sub = this.Communicate.OnOpen().subscribe({
      next: (val) => {
        this.picker = new DateTimePicker(val.Time);
        this.model = val;
        this.Open();
      },
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  Open() {
    this.modalRef = this.modalService.open(this.modalContent);
  }

  Close() {
    this.modalRef?.close();
  }

  Accept() {
    this.model.Time = this.picker.GetDate();
    this.Communicate.InitClose(this.model);
    this.Close();
  }
}
