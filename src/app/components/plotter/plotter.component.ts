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
import { stringify } from 'querystring';

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
    this.projectService.getProject(this.projectId).subscribe(project => {
      this.initPlotter(project);
      this.project = project;
    });
    this.setCoordinates();
    this.setMonths();
  }

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
  }

  getKMPosition(kmDate) {
    const plotMonth: number = kmDate.date.month;
    const plotYear: number = kmDate.date.year;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const differenceBwMonths = Math.abs(currentMonth - plotMonth);
    if (currentYear === plotYear) {
      return differenceBwMonths * 60;
    } else {
      return (12 - currentMonth + plotMonth) * 60;
    }
  }

  getKMOffset(date) {
    const positions = this.plottedDates.map(
      plottedDate => plottedDate.position
    );
    let counter = 0;
    let offset: number;
    let myStyles;
    positions.forEach(position => {
      if (date === position) {
        counter = counter + 1;
      }
    });
    if (counter > 0) {
      offset = (3 - counter) * 10;
    } else {
      offset = 30;
    }
    myStyles = {
      'margin-left': `${offset}px`,
    };

    return myStyles;
  }

  initPlotter(project) {
    project.keyMilestones.forEach((keyMilestone, i) => {
      this.plottedDates.push({
        bullet: i + 1,
        kmIndex: i,
        name: keyMilestone.name,
        date: keyMilestone.date,
        status: keyMilestone.status,
        position: this.getKMPosition(keyMilestone.date),
        offset: this.getKMOffset(this.getKMPosition(keyMilestone.date)),
      });
      keyMilestone.items.forEach((kmItem, j) => {
        this.plottedDates.push({
          bullet: j + 1,
          kmIndex: j,
          name: kmItem.name,
          date: kmItem.date,
          status: kmItem.status,
          position: this.getKMPosition(kmItem.date),
          offset: this.getKMOffset(this.getKMPosition(kmItem.date)),
        });
      });
    });
  }

  /********************** */
  /********************** */
  /********************** */

  onStart(event) {
    // console.log('started output:', event);
  }

  onStop(kmIndex, event) {


    // this.plottedDates.splice(0, (this.plottedDates.length + 1));
    // console.log(this.plottedDates);
    // this.initPlotter(this.project);
    //  console.log(this.plottedDates);
    // this.plottedDates.map(plottedDate => {
    //   plottedDate.offset['margin-left'] = '30px';
    // });
  }

  onMoving(event) {
    this.movingOffset.x = event.x;
    this.movingOffset.y = event.y;
    // console.log(event);

  }

  onMoveEnd(plotIndex, kmIndex, currentPosition, date, event) {
    const endOffset = {x: 0, y: 0};
    endOffset.x = event.x;
    endOffset.y = event.y;
    // const difference = event.x - currentPosition;
    // const divided = difference / 60;
    const monthsApart = (event.x - currentPosition) / 60;
    let newYear;
    let newMonth;
    if (monthsApart > (12 - date.date.month)) {
      newMonth = monthsApart - (12 - date.date.month);
      newYear = date.date.year + 1;
    } else {
      newMonth = date.date.month + monthsApart;
      newYear = date.date.year;
    }
    const newEpoc = new Date(newYear, newMonth, 28, 0, 0, 0, 0).getTime();
    // this.project.keyMilestones[kmIndex].name = 'new name';
    // this.project.keyMilestones[kmIndex].date.date = {
    //     day: 28,
    //     month: newMonth,
    //     year: newYear
    //   };


    this.project.keyMilestones[kmIndex].date = {
      date: {
        day: 28,
        month: newMonth,
        year: newYear
      },
      jsdate: {
        seconds: newEpoc
      },
      formatted: `${newMonth}/28/${newYear}`,
      epoc: newEpoc
    };

/**
export interface IMyDateModel {
    date: {day: number, month: number, year: number};
    jsdate: Date;
    formatted: string;
    epoc: number;
}
 */
    {

    this.projectService.updateProject(this.projectId, this.project);

    // console.log(`event.x = ${event.x}`);
    // console.log(`currentPosition = ${currentPosition}`);
    // console.log(`date = ${date.date.month}`);
    // console.log(date);

    console.log(this.project.keyMilestones[kmIndex].date);


    // console.log(`number of months apart = ${monthsApart}`);





  }
}
