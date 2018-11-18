import {Injectable} from '@angular/core';
import {Plotter} from '../plotter.model';

@Injectable({
  providedIn: 'root',
})
export class SetKmOffsetsService {
  constructor() {}

  setKMOffsets(dates: Plotter[]) {
    let repeated = [];
    let plottedDates: Plotter[] = dates;

    plottedDates.forEach(plottedDate => {
      plottedDates.forEach(pd => {
        if (plottedDate.date.date.month === pd.date.date.month) {
          repeated.push(pd);
        }
      });
      repeated.forEach((r, i) => {
        const l = repeated.length;
        let offset = 30;

        switch (true) {
          case l >= 1 && l <= 3:
            console.log(r.bullet);
            console.log('if (l >= 1 && l <= 3)');
            offset = offset - 10 * i;
            r.offset = {'margin-left': `${offset}px`};
            break;
          case l >= 4 && l <= 6:
            console.log(r.bullet);
            console.log('if (l >= 4 && l <= 6)');
            offset = offset - 5 * i;
            r.offset = {'margin-left': `${offset}px`};
            break;
          case l >= 7 && l <= 10:
            console.log(r.bullet);
            console.log('if (l >= 7 && l <= 10)');
            offset = offset - 3 * i;
            r.offset = {'margin-left': `${offset}px`};
            break;
          case l >= 11 && l <= 15:
            console.log(r.bullet);
            console.log('if (l >= 11 && l <= 15)');
            offset = offset - 2 * i;
            r.offset = {'margin-left': `${offset}px`};
            break;
          case l > 15 && l <= 30:
            console.log(r.bullet);
            console.log('if (l > 15 && l <= 30)');
            offset = offset - i;
            r.offset = {'margin-left': `${offset}px`};
            break;
          default:
            console.log(r.bullet);
            console.log('else');
            offset = 0;
            offset = offset + i;
            r.offset = {'margin-left': `${offset}px`};
            break;
        }

        // if (l >= 1 && l <= 3) {
        //   console.log(r.bullet);
        //   console.log('if (l >= 1 && l <= 3)');
        //   offset = offset - (10 * i);
        //   r.offset = {'margin-left': `${offset}px`};
        // } else if (l >= 4 && l <= 6) {
        //   console.log(r.bullet);
        //   console.log('if (l >= 4 && l <= 6)');
        //   offset = offset - (5 * i);
        //   r.offset = {'margin-left': `${offset}px`};
        // } else if (l >= 7 && l <= 10) {
        //   console.log(r.bullet);
        //   console.log('if (l >= 7 && l <= 10)');
        //   offset = offset - (3 * i);
        //   r.offset = {'margin-left': `${offset}px`};
        // } else if (l >= 11 && l <= 15) {
        //   console.log(r.bullet);
        //   console.log('if (l >= 11 && l <= 15)');
        //   offset = offset - (2 * i);
        //   r.offset = {'margin-left': `${offset}px`};
        // } else if (l > 15 && l <= 30) {
        //   console.log(r.bullet);
        //   console.log('if (l > 15 && l <= 30)');
        //   offset = offset - i;
        //   r.offset = {'margin-left': `${offset}px`};
        // } else {
        //   console.log(r.bullet);
        //   console.log('else');
        //   offset = 0;
        //   offset = offset + i;
        //   r.offset = {'margin-left': `${offset}px`};
        // }
      });
      repeated = [];
    });
    plottedDates = plottedDates.filter(p => p.position !== -1);
    console.log(plottedDates);

    return plottedDates;
  }
}
