import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlotterService {
  coordinates = [];
  months = [];

  constructor() { }

  setCoordinates() {
    for (let i = 0; i < 13; i++) {
      if (i === 0) {
        this.coordinates.push({
          x: 0,
          y: 0,
        });
      } else {
        this.coordinates.push({
          x: i * 60,
          y: i * -30,
        });
      }
    }
    return this.coordinates;
  }

  setMonths() {
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


  setKMOffsets(plottedDates) {
    // Check if any of the positions are -1
    // if any of them are -1, then that element should not be displayed
    const positions = plottedDates.map(
      plottedDate => plottedDate.position
    );

    plottedDates.forEach(plottedDate => {
      const position = plottedDate.position;
      let counter = 0;
      let offset: number;
      let myStyles;
      positions.forEach(p => {
        if (p !== -1) {
          if (p === position) {
            counter = counter + 1;
          }
        } else {
          counter = -1;
        }
      });

      if (counter > 1 && counter <= 4) {
        offset = (3 - counter) * 10;
      } else if (counter > 4 && counter <= 7) {
        offset = (6 - counter) * 5;
      } else if (counter > 7 && counter <= 11) {
        offset = (10 - counter) * 3;
      } else if (counter > 11 && counter <= 16) {
        offset = (16 - counter) * 2;
      } else if (counter > 15) {
        offset = 1;
      } else if (counter > 0) {
        offset = 30;
      } else {
        offset = 0;
      }

      // console.log(`counter for ${plottedDate.bullet} = ${counter};
      //             offset = ${offset},
      //             month = ${plottedDate.date.date.month}`);

      myStyles = {
        'margin-left': `${offset}px`,
      };
      plottedDate.offset = myStyles;
    });

    return plottedDates;
  }


}
