import {Injectable} from '@angular/core';
import {Plotter} from '../plotter.model';

@Injectable({
  providedIn: 'root',
})
export class SetKmOffsetsService {
  constructor() {}

  setKMOffsets(dates: Plotter[]) {
    console.log('setKMOffsets starts executing...');
    let counter = 0;
    let repeated = [];
    const plottedDates: Plotter[] = dates;


    plottedDates.forEach((plottedDate, index) => {
      plottedDates.forEach((pd, jdex) => {
        if (plottedDate.date.date.month === pd.date.date.month) {
          counter = counter + 1;
          repeated.push(pd);
        }
      });
      repeated.forEach((r, i) => {
        const l = repeated.length;
        let offset = 30;


        if (l >= 1 && l <= 3) {
          offset = offset - (10 * i);
          r.offset = {'margin-left': `${offset}px`};
        } else if (l >= 4 && l <= 6) {
          offset = offset - (5 * i);
          r.offset = {'margin-left': `${offset}px`};
          // const offset = (6 - repeatNumber) * 5;
          // plottedDate.offset = {
          //   'margin-left': `${offset}px`,
          // };
        } else if (l >= 7 && l <= 10) {
          offset = offset - (3 * i);
          r.offset = {'margin-left': `${offset}px`};
        } else if (l >= 11 && l <= 15) {
          offset = offset - (2 * i);
          r.offset = {'margin-left': `${offset}px`};
        } else if (l > 15 && l <= 30) {
          offset = offset - i;
          r.offset = {'margin-left': `${offset}px`};
        } else {
          offset = 0;
          offset = offset + i;
          r.offset = {'margin-left': `${offset}px`};
        }

      });
      repeated = [];
    });










    // const positions = plottedDates.map(plottedDate => plottedDate.position);

    // plottedDates.forEach(plottedDate => {
    //   const position = plottedDate.position;
    //   let counter = 0;
    //   let times = 0;
    //   positions.forEach(p => {
    //     if (p !== -1) {
    //       if (p === position) {
    //         counter = counter + 1;
    //       }
    //     }
    //   });
    //   if (counter > 0) {
    //     plottedDate.repeat = counter;
    //     plottedDates.forEach((pd, j) => {
    //       if (pd.repeat === plottedDate.repeat) {
    //         times = times + 1;
    //       }
    //     });
    //     plottedDate.repeatNumber = times;
    //   } else {
    //     plottedDate.repeat = 0;
    //     plottedDate.repeatNumber = 0;
    //   }
    // }); // plottedDates.forEach

    // plottedDates = plottedDates.filter(plottedDate => {
    //   return plottedDate.position !== -1;
    // });

    // console.log('plottedDates with all the repeats added before calc: ');
    // console.log(plottedDates);

    // plottedDates = this.calcOffset(plottedDates);
    return plottedDates;
  }

  /** CALC OFFSET */

  // calcOffset(dates: Plotter[]): Plotter[] {
  //   console.log('calcOffset is executing...');
  //   const plottedDates: Plotter[] = dates;

  //   plottedDates.forEach((plottedDate, i) => {
  //     const repeat = plottedDate.repeat;
  //     // const repeats = plottedDates.filter(p => p.repeat >= 1 && p.repeat <= 3);
  //     const repeatNumber = plottedDate.repeatNumber;
  //     if (repeat >= 1 && repeat <= 3) {
  //       const offset = (3 - repeatNumber) * 10;
  //       plottedDate.offset = {
  //         'margin-left': `${offset}px`,
  //       };
  //     } else if (repeat >= 4 && repeat <= 6) {
  //       const offset = (6 - repeatNumber) * 5;
  //       plottedDate.offset = {
  //         'margin-left': `${offset}px`,
  //       };
  //     } else if (repeat >= 7 && repeat <= 10) {
  //       const offset = (10 - repeatNumber) * 3;
  //       plottedDate.offset = {
  //         'margin-left': `${offset}px`,
  //       };
  //     } else if (repeat >= 11 && repeat <= 15) {
  //       const offset = (15 - repeatNumber) * 2;
  //       plottedDate.offset = {
  //         'margin-left': `${offset}px`,
  //       };
  //     } else if (repeat > 15) {
  //       const offset = 1;
  //       plottedDate.offset = {
  //         'margin-left': `${offset}px`,
  //       };
  //     } else {
  //       const offset = 0;
  //       plottedDate.offset = {
  //         'margin-left': `${offset}px`,
  //       };
  //     }
  //   });

  //   return plottedDates;
  // }

















  // const repeatedDates: Plotter[] = [];

  // plottedDates.forEach((plottedDate) => {
  //   if (plottedDate.repeat > 0) {
  //     repeatedDates.push(plottedDate);
  //   }
  // });

  // if (repeatedDates.length > 0) {
  //   repeatedDates.forEach(repeatedDate => {
  //     const groupedDates: Plotter[] = [];
  //     repeatedDates.forEach(rd => {
  //       if (rd === repeatedDate) {
  //         groupedDates.push(rd);
  //       }
  //     });

  //       groupedDates.forEach((groupedDate, i) => {
  //         const length = groupedDates.length;
  //         if (length >= 1 && length <= 3) {
  //           const offset = (3 - i) * 10;
  //           groupedDate.offset = {
  //             'margin-left': `${offset}px`,
  //           };
  //         } else if (length >= 4 && length <= 6) {
  //           const offset = (6 - i) * 5;
  //           groupedDate.offset = {
  //             'margin-left': `${offset}px`,
  //           };
  //         } else if (length >= 7 && length <= 10) {
  //           const offset = (10 - i) * 3;
  //           groupedDate.offset = {
  //             'margin-left': `${offset}px`,
  //           };
  //         } else if (length >= 11 && length <= 15) {
  //           const offset = (15 - i) * 2;
  //           groupedDate.offset = {
  //             'margin-left': `${offset}px`,
  //           };
  //         } else if (length > 15) {
  //           const offset = 1;
  //           groupedDate.offset = {
  //             'margin-left': `${offset}px`,
  //           };
  //         } else {
  //           const offset = 0;
  //           groupedDate.offset = {
  //             'margin-left': `${offset}px`,
  //           };
  //         }
  //       }); // groupedDates.forEach
  //     }); // repeatedDates.forEach

  //     return plottedDates;
  //   } // repeatedDates.length

  //     return plottedDates;

  // } // end of method
}
