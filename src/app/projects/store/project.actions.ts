import {Action} from '@ngrx/store';
import {Project} from '../recipe.model';

export const SET_PROJECTS = 'SET_PROJECTS';
export const ADD_PROJECT = 'ADD_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const STORE_PROJECTS = 'STORE_PROJECTS';
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';

export class SetProjects implements Action {
  readonly type = SET_PROJECTS;

  constructor(public payload: Project[]) {}
}

export class AddProject implements Action {
  readonly type = ADD_PROJECT;

  constructor(public payload: Project) {}
}

export class UpdateProject implements Action {
  readonly type = UPDATE_PROJECT;

  constructor(public payload: {index: number; updatedProject: Project}) {}
}

export class DeleteProject implements Action {
  readonly type = DELETE_PROJECT;

  constructor(public payload: number) {}
}

export class StoreProjects implements Action {
  readonly type = STORE_PROJECTS;
}

export class FetchProjects implements Action {
  readonly type = FETCH_PROJECTS;
}

export class FetchEvents implements Action {
  readonly type = FETCH_EVENTS;
}

export class FetchEventsSuccess implements Action {
  readonly type = FETCH_EVENTS_SUCCESS;
  constructor(public payload: Project[]) {}
}

export type ProjectActions =
  | SetProjects
  | AddProject
  | UpdateProject
  | DeleteProject
  | StoreProjects
  | FetchProjects
  | FetchEvents
  | FetchEventsSuccess;
