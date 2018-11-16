import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetPlotterMonthsService {
  months = [];

  constructor() { }

  setMonths() {
    this.months = [];
    for (let i = 0; i < 13; i++) {
      let currentDate = new Date();
      let february: number;
      currentDate.setMonth(currentDate.getMonth() + i);
      if (
        (currentDate.getFullYear() % 4 === 0 &&
          currentDate.getFullYear() % 100 !== 0) ||
        currentDate.getFullYear() % 400 === 0
      ) {
        february = 29;
      } else {
        february = 28;
      }
      const monthsShort = [
        {
          name: 'Jan',
          days: 31,
        },
        {
          name: 'Feb',
          days: february,
        },
        {
          name: 'Mar',
          days: 31,
        },
        {
          name: 'Apr',
          days: 30,
        },
        {
          name: 'May',
          days: 31,
        },
        {
          name: 'Jun',
          days: 30,
        },
        {
          name: 'Jul',
          days: 31,
        },
        {
          name: 'Aug',
          days: 31,
        },
        {
          name: 'Sep',
          days: 30,
        },
        {
          name: 'Oct',
          days: 31,
        },
        {
          name: 'Nov',
          days: 30,
        },
        {
          name: 'Dec',
          days: 31,
        },
      ];
      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        monthsShort[currentDate.getMonth()].days
      );

      this.months.push({
        month: monthsShort[currentDate.getMonth()].name,
        year: currentDate.getFullYear(),
      });
    }
    return this.months;
  }
}
