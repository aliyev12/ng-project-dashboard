import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromProject from '../store/project.reducers';
import * as ProjectActions from '../store/project.actions';
import {Project} from '../models/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  projectState: Observable<fromProject.State>;
  isAuthenticated: Observable<fromAuth.State>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public store1: Store<fromApp.AppState>,
    public store2: Store<fromProject.FeatureState>
  ) {}

  ngOnInit() {
    this.store2.dispatch(new ProjectActions.FetchEvents());
    this.projectState = this.store2.select('projects');
    this.isAuthenticated = this.store1.select('auth');
    this.isAuthenticated.subscribe(data => {
      if (data.authenticated) {
        this.store2.dispatch(new ProjectActions.FetchProjects());
      }
    });
  }

  onNewProject() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
