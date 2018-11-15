import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  AfterViewInit,
} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {Project} from '../../models/project.model';
import {Plotter} from './plotter.model';
import {PlotterService} from './plotter.service';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-plotter',
  templateUrl: './plotter.component.html',
  styleUrls: ['./plotter.component.css'],
})
export class PlotterComponent implements OnInit {
  // @ViewChild('item') dragItem: ElementRef;
  @Input() projectId: string;
  @Input() bullet: string;
  project: Project;
  plottedDates: Plotter[] = [];
  coordinates = [];
  months = [];
  gridSize = 60;
  movingOffset = {x: 0, y: 0};

  constructor(
    private projectService: ProjectService,
    private plotterService: PlotterService
  ) {}

  ngOnInit() {
    this.projectService.projectChanged.subscribe((data: string) => {
      this.projectId = data;
      this.initPlotter(this.project);
      this.projectService.getProject(this.projectId).subscribe(project => {
        this.initPlotter(project);
        this.plottedDates = this.plotterService.setKMOffsets(this.plottedDates);
        this.deletePlottedDatesWithNegativePositions();
        this.project = project;
      });
    });
    this.projectService.getProject(this.projectId).subscribe(project => {
      this.initPlotter(project);
      // this.setKMOffsets();
      this.plottedDates = this.plotterService.setKMOffsets(this.plottedDates);
      this.deletePlottedDatesWithNegativePositions();
      this.project = project;
    });
    this.coordinates = this.plotterService.setCoordinates();
    this.months = this.plotterService.setMonths();
  }

  getKMPosition(kmDate) {
    const plotMonth: number = kmDate.date.month;
    const plotYear: number = kmDate.date.year;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    if (
      new Date(kmDate.date.year, kmDate.date.month - 1, kmDate.date.day) >=
        currentDate &&
      new Date(kmDate.date.year, kmDate.date.month - 1, kmDate.date.day) <=
        new Date(
          currentDate.getFullYear() + 1,
          currentDate.getMonth(),
          28
        )
    ) {
      let differenceBwMonths;

      if (currentMonth <= plotMonth && currentYear === plotYear) {
        differenceBwMonths = Math.abs(currentMonth - plotMonth);
      } else {
        differenceBwMonths = plotMonth + (12 - currentMonth);
      }
      if (currentYear === plotYear) {
        return differenceBwMonths * 60;
      } else {
        return differenceBwMonths * 60;
      }
    } else {
      return -1;
    }
  } // end of method

  getKMOffset(positionFromPlottedDates) {
    const positions = this.plottedDates.map(
      plottedDate => plottedDate.position
    );
    let counter = 0;
    let offset: number;
    let myStyles;
    positions.forEach(position => {
      if (positionFromPlottedDates === position) {
        counter = counter + 1;
      }
    });
    if (counter > 0 && counter <= 3) {
      console.log('0 - 3');
      offset = (3 - counter) * 10;
    } else if (counter > 3 && counter <= 6) {
      console.log('3 - 6');
      offset = (6 - counter) * 5;
    } else if (counter > 6 && counter <= 10) {
      console.log('6 - 10');
      offset = (10 - counter) * 3;
    } else if (counter > 10 && counter <= 15) {
      console.log('10 - 15');
      offset = (15 - counter) * 2;
    } else if (counter > 15) {
      console.log('15+');
      offset = 1;
    } else {
      console.log('30');
      offset = 30;
    }
    myStyles = {
      'margin-left': `${offset}px`,
    };
    return myStyles;
  }

  // setKMOffsets() {
  //   // Check if any of the positions are -1
  //   // if any of them are -1, then that element should not be displayed
  //   const positions = this.plottedDates.map(
  //     plottedDate => plottedDate.position
  //   );

  //   this.plottedDates.forEach(plottedDate => {
  //     const position = plottedDate.position;
  //     let counter = 0;
  //     let offset: number;
  //     let myStyles;
  //     positions.forEach(p => {
  //       if (p !== -1) {
  //         if (p === position) {
  //           counter = counter + 1;
  //         }
  //       } else {
  //         counter = -1;
  //       }
  //     });

  //     if (counter > 1 && counter <= 4) {
  //       offset = (3 - counter) * 10;
  //     } else if (counter > 4 && counter <= 7) {
  //       offset = (6 - counter) * 5;
  //     } else if (counter > 7 && counter <= 11) {
  //       offset = (10 - counter) * 3;
  //     } else if (counter > 11 && counter <= 16) {
  //       offset = (16 - counter) * 2;
  //     } else if (counter > 15) {
  //       offset = 1;
  //     } else if (counter > 0) {
  //       offset = 30;
  //     } else {
  //       offset = 0;
  //     }

  //     // console.log(`counter for ${plottedDate.bullet} = ${counter};
  //     //             offset = ${offset},
  //     //             month = ${plottedDate.date.date.month}`);

  //     myStyles = {
  //       'margin-left': `${offset}px`,
  //     };
  //     plottedDate.offset = myStyles;
  //   });
  // }

  deletePlottedDatesWithNegativePositions() {
    console.log('inside deletePlottedDatesWithNegativePositions()...');

    console.log(this.plottedDates);
  }

  initPlotter(project) {
    this.plottedDates = [];
    project.keyMilestones.forEach((keyMilestone, i) => {
      if (keyMilestone.date) {
        this.plottedDates.push({
          bullet: i + 1,
          kmIndex: i,
          name: keyMilestone.name,
          date: keyMilestone.date,
          status: keyMilestone.status,
          position: this.getKMPosition(keyMilestone.date),
          // offset: this.getKMOffset(this.getKMPosition(keyMilestone.date)),
          offset: {'margin-left': '0px'},
        });

        keyMilestone.items.forEach((kmItem, j) => {
          this.plottedDates.push({
            bullet: j + 1,
            kmIndex: j,
            name: kmItem.name,
            date: kmItem.date,
            status: kmItem.status,
            position: this.getKMPosition(kmItem.date),
            // offset: this.getKMOffset(this.getKMPosition(kmItem.date)),
            offset: {'margin-left': '0px'},
          });
        });
      }
    });
  }

  onStart(event) {}

  onStop(kmIndex, event) {}

  onMoving(event) {
    this.movingOffset.x = event.x;
    this.movingOffset.y = event.y;
  }

  onMoveEnd(plotIndex, kmIndex, currentPosition, date, event) {
    const currentDate = new Date();
    const endOffset = {x: 0, y: 0};
    endOffset.x = event.x;
    endOffset.y = event.y;
    const monthsApart = (event.x - currentPosition) / 60;
    let newYear;
    let newMonth;

    // if (monthsApart < 0) {
    //   if (Math.abs(monthsApart) >= date.date.month) {
    //     newMonth = (-1) * ((Math.abs(monthsApart) - date.date.month) - 12);
    //     newYear = date.date.year - 1;
    //   } else if (Math.abs(monthsApart) < date.date.month) {
    //     newMonth = date.date.month - Math.abs(monthsApart);
    //     newYear = date.date.year;
    //   }
    // } else {
    //   if (Math.abs(monthsApart) <= date.date.month) {
    //     newMonth = (-1) * ((Math.abs(monthsApart) - date.date.month) - 12);
    //     newYear = date.date.year - 1;
    //   } else if (Math.abs(monthsApart) > date.date.month) {
    //     newMonth = date.date.month + Math.abs(monthsApart);
    //     newYear = date.date.year;
    //   }
    // }

    if (monthsApart >= 0) {
      if ((date.date.month + monthsApart) > 12) {
        newMonth = monthsApart - (12 - date.date.month);
        newYear = date.date.year + 1;
      } else {
        newMonth = date.date.month + monthsApart;
        newYear = date.date.year;
      }
    } else {
      if ((date.date.month + monthsApart) <= 0) {
        newMonth = 12 - (Math.abs(monthsApart) - date.date.month);
        newYear = date.date.year - 1;
      } else {
        newMonth = date.date.month + monthsApart;
        newYear = date.date.year;
      }
    }


    const newEpoc = new Date(newYear, newMonth, 28, 0, 0, 0, 0).getTime();

    this.project.keyMilestones[kmIndex].date = {
      date: {
        day: 28,
        month: newMonth,
        year: newYear,
      },
      jsdate: {
        nanoseconds: 0,
        seconds: newEpoc,
      },
      formatted: `${newMonth}/28/${newYear}`,
      epoc: newEpoc,
    };
    this.projectService.updateProject(this.projectId, this.project);
  }
}
