import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ScheduleItem, ScheduleList } from '../../../shared/services/schedule/schedule.service';

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
        [selected]="selectedDayIndex"
        (select)="selectDay($event)">
      </schedule-days>
        
      <schedule-section
        *ngFor="let section of sections"
        [name]="section.name"
        [section]="getSection(section.key)"
        (select)="selectSection($event, section.key)"
        >

      </schedule-section>
    </div>
  `
})
export class ScheduleCalendarComponent implements OnChanges {

  selectedDayIndex: number;
  selectedDay: Date;
  selectedWeek: Date;

  sections = [
    { key: 'morning', name: 'Morning' },
    { key: 'lunch', name: 'Lunch' },
    { key: 'evening', name: 'Evening' },
    { key: 'snacks', name: 'Snacks and Drinks' },
  ];

  // "set gives us the value that's coming in from the input"
  // so it seems like a way of passing on an input from this components
  // Input (date) and passing it to the child (selected)
  @Input()
  set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
  }

  @Input()
  items: ScheduleList;

  @Output()
  change = new EventEmitter<Date>();

  @Output()
  select = new EventEmitter<any>();

  constructor() {}

  ngOnChanges() {
    // when day changes, ie. any Input changes, this ngOnChanges
    // life cycle event runs and updates other variables
    this.selectedDayIndex = ScheduleCalendarComponent.getToday(this.selectedDay);
    this.selectedWeek = ScheduleCalendarComponent.getStartOfWeek(new Date(this.selectedDay));
  }

  getSection(name: string): ScheduleItem {
    // code below is shorthand for..
    // if items exist, then return items[name else return empty object
    return this.items && this.items[name] || {};
  }

  // using object destructing.. declaring object shapes in the params
  selectSection({type, assigned, data}: any, section: string) {
    console.log('selectSection', event);

    const day = this.selectedDay;
    this.select.emit({
      type,
      assigned,
      section,
      day,
      data
    })
  }

  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek); // set it start of week
    selectedDay.setDate(selectedDay.getDate() + index); // set to actual selected day
    this.change.emit(selectedDay);
  }

  onChange(weekOffset: number) {
    // modify date by offset
    const startOfWeek = ScheduleCalendarComponent.getStartOfWeek( new Date() );
    const startDate = (
      new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
    );
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
    this.change.emit(startDate);
  }

  private static getStartOfWeek(date: Date) {
    const day = date.getDay();
    // assumes start of week is a monday
    const diff = date.getDate() - day + ( day === 0 ? - 6 : 1) ;
    return new Date(date.setDate(diff));
  }

  // i think this is only used because getDay returns 0 for sunday and
  // we want 0 to be monday and 6 to be saturday
  private static getToday(date: Date) {
    let today = date.getDay() - 1; // why decrement today?
    if (today < 0) {
      today = 6;
    }
    return today;
  }



 }
