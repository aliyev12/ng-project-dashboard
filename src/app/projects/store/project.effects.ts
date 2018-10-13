import {Effect, Actions} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as ProjectActions from '../store/project.actions';
import {switchMap, withLatestFrom, map, tap} from 'rxjs/operators';
import {Project} from '../models/project.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import * as fromProject from '../store/project.reducers';
import {Store} from '@ngrx/store';
import {FirebaseService} from '../firebase.service';

@Injectable()
export class ProjectEffects {
  @Effect()
  projectFetch = this.actions$.ofType(ProjectActions.FETCH_PROJECTS).pipe(
    switchMap((action: ProjectActions.FetchProjects) => {
      return this.httpClient.get<Project[]>(
        'https://ng-project-book-efcae.firebaseio.com/projects.json',
        {
          observe: 'body',
          responseType: 'json',
        }
      );
    }),
    map(projects => {
      for (const project of projects) {
        if (!project['ingredients']) {
          project['ingredients'] = [];
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
        'https://ng-project-book-efcae.firebaseio.com/projects.json',
        state.projects,
        {reportProgress: true}
      );
      return this.httpClient.request(req);
    })
  );

  @Effect()
  eventsStore = this.actions$.ofType(ProjectActions.FETCH_EVENTS).pipe(
    // filtering actions
    switchMap(() =>
      this.firebaseService.items.do(
        payload => new ProjectActions.FetchEventsSuccess(payload)
      )
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private httpClient: HttpClient,
    private store: Store<fromProject.FeatureState>,
    private firebaseService: FirebaseService
  ) {}
}
