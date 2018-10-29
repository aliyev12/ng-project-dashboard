import {Action} from '@ngrx/store';
import { Project } from '../models/project.model';
import { KeyMilestone } from '../models/key-milestone/key-milestone.model';

export const SET_PROJECTS = 'SET_PROJECTS';
export const ADD_PROJECT = 'ADD_PROJECT';
export const ADD_KEY_MILESTONE = 'ADD_KEY_MILESTONE';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const STORE_PROJECTS = 'STORE_PROJECTS';
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const SET_LAST_MODIFIED = 'SET_LAST_MODIFIED';

export class SetProjects implements Action {
  readonly type = SET_PROJECTS;

  constructor(public payload: Project[]) {}
}

export class AddProject implements Action {
  readonly type = ADD_PROJECT;

  constructor(public payload: Project) {}
}

export class AddKeyMilestone implements Action {
  readonly type = ADD_KEY_MILESTONE;

  constructor(public payload: {projectIndex: number; keyMilestone: KeyMilestone}) {}
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

export class SetLastModified implements Action {
  readonly type = SET_LAST_MODIFIED;

  constructor(public payload: Date) {}
}

export type ProjectActions =
  | SetProjects
  | AddProject
  | AddKeyMilestone
  | UpdateProject
  | DeleteProject
  | StoreProjects
  | FetchProjects
  | SetLastModified;
