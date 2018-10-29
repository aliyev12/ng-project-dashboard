import {Effect, Actions} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as ProjectActions from './project.actions';
import {switchMap, withLatestFrom, map, tap} from 'rxjs/operators';
import {Project} from '../models/project.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import * as fromProject from './project.reducers';
import {Store} from '@ngrx/store';

@Injectable()
export class ProjectEffects {
  @Effect()
  projectFetch = this.actions$.ofType(ProjectActions.FETCH_PROJECTS).pipe(
    switchMap((action: ProjectActions.FetchProjects) => {
      return this.httpClient.get<Project[]>(
        'https://ng-project-dashboard.firebaseio.com/projects.json',
        {
          observe: 'body',
          responseType: 'json',
        }
      );
    }),
    map(projects => {
      for (const project of projects) {
        if (!project['keyMilestones']) {
          project['keyMilestones'] = [];
        } else if (!project['upcomingKeyActivities']) {
          project['upcomingKeyActivities'] = [];
        } else if (!project['resourceAssignments']) {
          project['resourceAssignments'] = [];
        } else if (!project['keyRisks']) {
          project['keyRisks'] = [];
        } else if (!project['requiredDecisions']) {
          project['requiredDecisions'] = [];
        }
      }
      return {
        type: ProjectActions.SET_PROJECTS,
        payload: projects,
      };
    })
  );

  @Effect({dispatch: false})
  projectStore = this.actions$.ofType(ProjectActions.STORE_PROJECTS).pipe(
    withLatestFrom(this.store.select('projects')),
    switchMap(([action, state]) => {
      const req = new HttpRequest(
        'PUT',
        'https://ng-project-dashboard.firebaseio.com/projects.json',
        state.projects,
        {reportProgress: true}
      );
      return this.httpClient.request(req);
    })
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private httpClient: HttpClient,
    private store: Store<fromProject.FeatureState>
  ) {}
}
