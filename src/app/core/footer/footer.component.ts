import {Component, OnInit} from '@angular/core';
import * as fromProject from '../../projects/store/project.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  year = new Date().getFullYear();
  lastModifierDate: Date;
  projectState: Observable<fromProject.State>;

  constructor(private store: Store<fromProject.FeatureState>) {}

  ngOnInit() {
    this.projectState = this.store.select('projects');
    this.projectState.subscribe(data => {
        this.lastModifierDate = data.lastModified;
      }
      );





  }

}
