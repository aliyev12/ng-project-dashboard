import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromProject from '../store/project.reducers';
import * as ProjectActions from '../store/project.actions';
import {Project} from '../models/project.model';
import { async } from 'q';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css'],
})
export class ProjectsListComponent implements OnInit {
  projectState: Observable<fromProject.State>;
  isAuthenticated: Observable<fromAuth.State>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public store: Store<fromProject.FeatureState>
  ) {}

  ngOnInit() {
    this.projectState = this.store.select('projects');
    this.projectState.subscribe(
      data => {
        console.log('log1');
        console.log(data.projects);
        console.log('log2');
      }
    );
    this.isAuthenticated = this.store.select('auth');
    this.isAuthenticated.subscribe(data => {
      if (data.authenticated) {
        // this.store.dispatch(new ProjectActions.FetchProjects());
      }
    });
  }

  onNewProject() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
