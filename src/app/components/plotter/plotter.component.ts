import { Component, OnInit, Input } from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {Project} from '../../models/project.model';
import {Plotter} from './plotter.model';
import {PlotterService} from './services/plotter.service';
import { SetPlotterMonthsService } from './services/set-plotter-months.service';
import { GetKmPositionService } from './services/get-km-position.service';
import { SetKmOffsetsService } from './services/set-km-offsets.service';

@Component({
  selector: 'app-plotter',
  templateUrl: './plotter.component.html',
  styleUrls: ['./plotter.component.css'],
})
export class PlotterComponent implements OnInit {
  @Input() projectId: string;
  @Input() bullet: string;
  project: Project;
  plottedDates: Plotter[] = [];
  coordinates = [];
  months = [];
  gridSize = 60;

  constructor(
    private projectService: ProjectService,
    private plotterService: PlotterService,
    private setPlotterMonthsService: SetPlotterMonthsService,
    private getKmPositionService: GetKmPositionService,
    private setKmOffsetsService: SetKmOffsetsService
  ) {}

  ngOnInit() {
    this.projectService.projectChanged.subscribe((data: string) => {
      this.projectId = data;
      this.initPlotter(this.project);
      this.getProjectFromService();
    });
    this.getProjectFromService();
    this.coordinates = this.plotterService.setCoordinates();
    this.months = this.setPlotterMonthsService.setMonths();
  }

  getProjectFromService() {
    this.projectService.getProject(this.projectId).subscribe(project => {
      this.initPlotter(project);
      this.plottedDates = this.setKmOffsetsService.setKMOffsets(this.plottedDates);
      this.project = project;
    });
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
          position: this.getKmPositionService.getKMPosition(keyMilestone.date),
          repeat: 0,
          offset: {'margin-left': '30px'},
        });

        keyMilestone.items.forEach((kmItem, j) => {
          this.plottedDates.push({
            bullet: j + 1,
            kmIndex: j,
            name: kmItem.name,
            date: kmItem.date,
            status: kmItem.status,
            position: this.getKmPositionService.getKMPosition(kmItem.date),
            repeat: 0,
            repeatNumber: 0,
            offset: {'margin-left': '30px'},
          });
        });
      }
    });
  }

  onMoveEnd(plotIndex, kmIndex, currentPosition, date, event) {
    const monthsApart = (event.x - currentPosition) / 60;
    let newYear;
    let newMonth;

    if (monthsApart >= 0) {
      if (date.date.month + monthsApart > 12) {
        newMonth = monthsApart - (12 - date.date.month);
        newYear = date.date.year + 1;
      } else {
        newMonth = date.date.month + monthsApart;
        newYear = date.date.year;
      }
    } else {
      if (date.date.month + monthsApart <= 0) {
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
