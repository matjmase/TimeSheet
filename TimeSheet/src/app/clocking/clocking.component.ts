import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ModalFormModel } from '../modal/ModalFormModel';
import { ClockEvent, IClockEvent } from '../models/IClockEvent';
import { pipe, filter, Subscription } from 'rxjs';
import { CurrentSheetService } from '../services/current-sheet.service';

@Component({
  selector: 'app-clocking',
  templateUrl: './clocking.component.html',
  styleUrls: ['./clocking.component.scss'],
})
export class ClockingComponent implements OnInit, OnDestroy {
  @ViewChild('loadFile', { static: true })
  private loadFileRef!: ElementRef<HTMLInputElement>;

  private loadFileChange: (event: Event) => void = (val) => {
    var reader = new FileReader();
    reader.onload = this.OnReaderLoadCallBack;
    reader.readAsText((<FileList>(<HTMLInputElement>val.target).files)[0]);
  };

  private loadFileChangeCallback: (event: Event) => void =
    this.loadFileChange.bind(this);

  private OnReaderLoadCallBack: (event: ProgressEvent) => void =
    this.OnReaderLoad.bind(this);

  modalCommunication = new ModalFormModel<IClockEvent>();
  sub: Subscription | undefined;

  events: IClockEvent[] = [];

  indexOfUpdate = -1;

  encapsulatedTime: Date = new Date(0);
  currentlyClockedIn: Date = new Date(0);

  get totalClocked() {
    return new Date(
      this.encapsulatedTime.getTime() +
        this.currentlyClockedIn.getTime() +
        new Date(2000, 0, 0, 0, 0, 0, 0).getTime()
    );
  }

  constructor(
    private clockingService: CurrentSheetService,
    private changeRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log(this.loadFileRef);
    this.loadFileRef.nativeElement.addEventListener(
      'change',
      this.loadFileChangeCallback
    );

    this.events = this.clockingService.GetEvents();
    this.CalculateTimeSpans();

    setInterval(() => {
      if (
        this.events.length !== 0 &&
        this.events[this.events.length - 1].ClockingIn &&
        this.events[this.events.length - 1].Time.getTime() <
          new Date().getTime()
      ) {
        this.currentlyClockedIn = new Date(
          new Date().getTime() -
            this.events[this.events.length - 1].Time.getTime()
        );
      } else {
        this.currentlyClockedIn = new Date(0);
      }
    }, 1000);

    this.sub = this.modalCommunication.OnClose().subscribe({
      next: (val) => this.ProcessUpdatedItem(this.indexOfUpdate, val),
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  AddItem() {
    this.indexOfUpdate = -1;
    const toAdd = new ClockEvent();

    toAdd.ClockingIn =
      this.events.length === 0 ||
      this.events[this.events.length - 1].ClockingIn === false;

    this.modalCommunication.InitOpen(toAdd);
  }

  EditItem(index: number) {
    this.indexOfUpdate = index;
    this.modalCommunication.InitOpen(this.events[index]);
  }

  SaveFile() {
    var fileContent = JSON.stringify(this.events);
    var bb = new Blob([fileContent], { type: 'text/plain' });
    var a = document.createElement('a');
    const currDate = new Date().toLocaleDateString();
    a.download = currDate + ' - timesheet.txt';
    a.href = window.URL.createObjectURL(bb);
    a.click();
  }

  LoadFile() {}

  ProcessUpdatedItem(index: number, val: IClockEvent) {
    let realIndex = 0;
    if (index === -1) {
      this.events.push(val);
      realIndex = this.events.length - 1;
    } else {
      this.events[index] = val;
      realIndex = index;
    }

    this.AdjustIfNecessary(realIndex);
    this.clockingService.UpdateEvents(this.events);

    this.CalculateTimeSpans();
    this.currentlyClockedIn = new Date(0);

    this.changeRef.markForCheck();
  }

  AdjustIfNecessary(index: number) {
    const change = this.events[index];

    for (var i = index + 1; i < this.events.length; i++) {
      if (this.events[i].Time < change.Time) {
        this.events[i].Time = change.Time;
      }
    }

    for (var i = index - 1; i >= 0; i--) {
      if (this.events[i].Time > change.Time) {
        this.events[i].Time = change.Time;
      }
    }
  }

  CalculateTimeSpans() {
    let start = 0;

    let cache = new Date();
    this.events.forEach((event) => {
      if (event.ClockingIn) cache = event.Time;
      else {
        start += event.Time.getTime() - cache.getTime();
      }
    });

    this.encapsulatedTime = new Date(start);
  }

  OnReaderLoad(event: ProgressEvent) {
    try {
      this.events = JSON.parse(
        <string>(<FileReader>event.target).result,
        (key: string, value: any) => {
          return key === 'Time' ? new Date(<string>value) : value;
        }
      );
      this.clockingService.UpdateEvents(this.events);
      this.changeRef.markForCheck();
    } catch (e) {
      console.log(e);
      alert('Failed to load file');
    }
  }
}
