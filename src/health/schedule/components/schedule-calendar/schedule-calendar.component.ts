import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'schedule-calendar',
  styleUrls: ['schedule-calendar.component.scss'],
  template: `
    <div class="calendar">
      <schedule-controls
        [selected]="selectedDay"
        (move)="onChange($event)">
      </schedule-controls>
        
      <schedule-days
        [selected]="selectedDayIndex">
          
      </schedule-days>
    </div>
  `
})
export class ScheduleCalendarComponent implements OnChanges {

  selectedDayIndex: number;
  selectedDay: Date;
  selectedWeek: Date;

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
    // modify date by offset
    const startOfWeek = this.getStartOfWeek( new Date() );
    const startDate = (
      new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
    );
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
    this.change.emit(startDate);
  }

  ngOnChanges() {
    // when day changes, ie. any Input changes, this ngOnChanges
    // life cycle event runs and updates other variables
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }

  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    // assumes start of week is a monday
    const diff = date.getDate() - day + ( day === 0 ? - 6 : 1) ;
    return new Date(date.setDate(diff));
  }

  // i think this is only used because getDay returns 0 for sunday and
  // we want 0 to be monday and 6 to be saturday
  private getToday(date: Date) {
    let today = date.getDay() - 1; // why decrement today?
    if (today < 0) {
      today = 6;
    }
    return today;
  }

 }
