import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-plotter',
  templateUrl: './plotter.component.html',
  styleUrls: ['./plotter.component.css'],
})
export class PlotterComponent implements OnInit {
  // @ViewChild('item') dragItem: ElementRef;

  coordinates = [];
  months = [
    {
      month: 'Jan',
      year: '2018'
    },
    {
      month: 'Feb',
      year: '2018'
    },
    {
      month: 'Mar',
      year: '2018'
    },
    {
      month: 'Apr',
      year: '2018'
    },
    {
      month: 'May',
      year: '2018'
    },
    {
      month: 'Jun',
      year: '2018'
    },
    {
      month: 'Jul',
      year: '2018'
    },
    {
      month: 'Aug',
      year: '2018'
    },
    {
      month: 'Sep',
      year: '2018'
    },
    {
      month: 'Oct',
      year: '2018'
    },
    {
      month: 'Nov',
      year: '2018'
    },
    {
      month: 'Dec',
      year: '2018'
    }
  ];

  gridSize = 60;

  constructor() {}

  ngOnInit() {
    this.setCoordinates();
    console.log(this.coordinates);
  }

  setCoordinates() {
    for (let i = 0; i < 12; i++) {
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
}
