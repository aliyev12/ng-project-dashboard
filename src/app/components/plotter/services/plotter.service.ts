import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlotterService {
  coordinates = [];
  movingOffset = {x: 0, y: 0};

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







    /***** USELESS METHODS */
    /* THE THREE EVENT LISTENERS BELOW USED TO SIT ON CLASS=plottedDate ELEMENT IN TEMPLATE
        IF YOU NEED TO RE-INTEGRATE THEM, JUST COPY AND PASTE THEM BACK INTO TEMPLATE
        THEIR CORRESPONDING METHODS ARE RIGHT BELOW COMMENT BLOCK :
    (started)="onStart($event)"
    (stopped)="onStop(plottedDate.kmIndex, $event)"
    (movingOffset)="onMoving($event)"
    */
    onStart(event) {}
    onStop(kmIndex, event) {}
    onMoving(event) {
      this.movingOffset.x = event.x;
      this.movingOffset.y = event.y;
    }


}
