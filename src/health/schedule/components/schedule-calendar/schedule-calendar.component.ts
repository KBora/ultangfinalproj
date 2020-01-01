import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'schedule-calendar',
  styleUrls: ['schedule-calendar.component.scss'],
  template: `
    <div class="calendar">
      <schedule-controls
        [selected]="selectedDay"
        (move)="onChange($event)">
      </schedule-controls>
    </div>
  `
})
export class ScheduleCalendarComponent {

  selectedDay: Date;

  // "set gives us the value that's coming in from the input"
  // so it seems like a way of passing on an input from this components
  // Input (date) and passing it to the child (selected)
  @Input()
  set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
  }

  @Output()
  change = new EventEmitter<Date>();

  constructor() {}

  onChange(weekOffset: number) {
    console.log('weekOffset:', weekOffset);
    // modify date by offset
    const startOfWeek = this.getStartOfWeek( new Date() );
    console.log('start of week:', startOfWeek);
    const startDate = (
      new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
    );
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
    this.change.emit(startDate);
  }

  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    // assumes start of week is a monday
    const diff = date.getDate() - day + ( day === 0 ? - 6 : 1) ;

    return new Date(date.setDate(diff));
  }

 }
