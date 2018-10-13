import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';
  clientHeight: number;

  constructor() {
    this.clientHeight = window.innerHeight;
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDZhoHrSZgnEurG8rwT5NaitgKr-E4i3Jk',
      authDomain: 'ng-recipe-book-efcae.firebaseapp.com',
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
