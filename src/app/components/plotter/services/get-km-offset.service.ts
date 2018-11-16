import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetKmOffsetService {

  constructor() { }

  // getKMOffset(positionFromPlottedDates) {
  //   const positions = this.plottedDates.map(
  //     plottedDate => plottedDate.position
  //   );
  //   let counter = 0;
  //   let offset: number;
  //   let myStyles;
  //   positions.forEach(position => {
  //     if (positionFromPlottedDates === position) {
  //       counter = counter + 1;
  //     }
  //   });
  //   if (counter > 0 && counter <= 3) {
  //     console.log('0 - 3');
  //     offset = (3 - counter) * 10;
  //   } else if (counter > 3 && counter <= 6) {
  //     console.log('3 - 6');
  //     offset = (6 - counter) * 5;
  //   } else if (counter > 6 && counter <= 10) {
  //     console.log('6 - 10');
  //     offset = (10 - counter) * 3;
  //   } else if (counter > 10 && counter <= 15) {
  //     console.log('10 - 15');
  //     offset = (15 - counter) * 2;
  //   } else if (counter > 15) {
  //     console.log('15+');
  //     offset = 1;
  //   } else {
  //     console.log('30');
  //     offset = 30;
  //   }
  //   myStyles = {
  //     'margin-left': `${offset}px`,
  //   };
  //   return myStyles;
  // }
}
