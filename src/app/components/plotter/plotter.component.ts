import {Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {Project} from '../../models/project.model';
import {Plotter} from './plotter.model';

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
  endOffset = {x: 0, y: 0};

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectService.getProject(this.projectId).subscribe(project => {
      this.project = project;
      project.keyMilestones.forEach((keyMilestone, i) => {
        this.plottedDates.push({
          bullet: i + 1,
          name: keyMilestone.name,
          date: keyMilestone.date,
          status: keyMilestone.status,
          position: this.getKMPosition(keyMilestone.date),
        });
        keyMilestone.items.forEach(kmItem => {
          this.plottedDates.push({
            bullet: i + 1,
            name: kmItem.name,
            date: kmItem.date,
            status: kmItem.status,
            position: this.getKMPosition(kmItem.date),
          });
        });
      });

      this.repositionBubbles();
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

  repositionBubbles() {
    const positions = [];
    console.log('repositioning...');
    if (this.plottedDates) {
      this.plottedDates.forEach((plottedDate, i) => {
        positions.push(`${i+1} - ${plottedDate.position}`);
      });
    }

    console.log(positions);


  }

  /********************** */
  /********************** */
  /********************** */

  onStart(event) {
    // console.log('started output:', event);
  }

  onStop(event) {
    // console.log('stopped output:', event);
  }

  onMoving(event) {
    this.movingOffset.x = event.x;
    this.movingOffset.y = event.y;
  }

  onMoveEnd(event) {
    this.endOffset.x = event.x;
    this.endOffset.y = event.y;
  }
}
