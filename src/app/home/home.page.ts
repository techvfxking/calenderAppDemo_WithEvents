import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CalendarComponent, CalendarMode, Step } from 'ionic7-calendar';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // calender = {
  //   mode: 'month' as CalendarMode,
  //   currentDate: new Date()
  // }

  // @ViewChild(CalendarComponent) myCal!: CalendarComponent;
  // constructor() {}

  // viewTitle = ''
  // eventSource: any[] = [];
  // newEvent: any = {
  //   title: '',
  //   allDay: false,
  //   startTime: null,
  //   endTime: null
  // };

  // setToday(){
  //   this.myCal.currentDate = this.calender.currentDate
  // }

  // next(){
  //   this.myCal.slideNext();
  // }

  // back(){
  //   this.myCal.slidePrev();
  // }

  // addEvent(){

  // }

  eventSource!: { title: string; startTime: Date; endTime: Date; allDay: boolean; eventId: number; }[];
    viewTitle: any;

    isToday!: boolean;
    calendar = {
        mode: 'month' as CalendarMode,
        step: 30 as Step,
        currentDate: new Date(),
        dateFormatter: {
            formatMonthViewDay: function(date:Date) {
                return date.getDate().toString();
            },
            formatMonthViewDayHeader: function(date:Date) {
                return 'MonMH';
            },
            formatMonthViewTitle: function(date:Date) {
                return 'testMT';
            },
            formatWeekViewDayHeader: function(date:Date) {
                return 'MonWH';
            },
            formatWeekViewTitle: function(date:Date) {
                return 'testWT';
            },
            formatWeekViewHourColumn: function(date:Date) {
                return 'testWH';
            },
            formatDayViewHourColumn: function(date:Date) {
                return 'testDH';
            },
            formatDayViewTitle: function(date:Date) {
                return 'testDT';
            }
        }
    };

    constructor(private navController:NavController) {

    }

    loadEvents() {
        this.eventSource = this.createRandomEvents();
    }

    onViewTitleChanged(title: any) {
        this.viewTitle = title;
    }

    onEventSelected(event : any) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }

    changeMode(mode: string) {
        this.calendar.mode = mode as CalendarMode;
    }

    today() {
        this.calendar.currentDate = new Date();
    }

    onTimeSelected(ev: any) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }

    onCurrentDateChanged(event:Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }

    createRandomEvents() {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true,
                    eventId: Math.random()
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: `Event - ${i} <ion-button (click)="addDetails(1)">Add Item</ion-button>`,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false,
                    eventId: Math.random(),
                });
            }
        }
        return events;
    }

    onRangeChanged(ev: { startTime: string; endTime: string; }) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }

    markDisabled = (date:Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };

    addDetails(eventId: number) {
      // Implement logic to add details based on event ID
      console.log('Add details for event ID:', eventId);
      // Example: Navigate to a details page with event ID as a parameter
    }



}
