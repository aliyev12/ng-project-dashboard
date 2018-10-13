import {Project} from '../models/project.model';
import {Ingredient} from '../../shared/ingredient.model';
import * as ProjectActions from './project.actions';
import * as fromApp from '../../store/app.reducers';
import {HttpParams, HttpClient, HttpRequest} from '@angular/common/http';

export interface FeatureState extends fromApp.AppState {
  projects: State;
}

export interface State {
  projects: Project[];
}

const initialState: State = {
  projects: [
    new Project(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Project(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ], // end of projects array declaration.
};

// this.store.dispatch(new ProjectActions.FetchProjects());

export function projectReducer(
  state = initialState,
  action: ProjectActions.ProjectActions
) {
  switch (action.type) {
    case ProjectActions.SET_PROJECTS:
      return {
        ...state,
        projects: [...action.payload],
      };

    case ProjectActions.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };

    case ProjectActions.UPDATE_PROJECT:
      const project = state.projects[action.payload.index];
      const updatedProject = {
        ...project,
        ...action.payload.updatedProject,
      };
      const projects = [...state.projects];
      projects[action.payload.index] = updatedProject;
      return {
        ...state,
        projects: projects,
      };

    case ProjectActions.DELETE_PROJECT:
      const oldProjects = [...state.projects];
      oldProjects.splice(action.payload, 1);
      return {
        ...state,
        projects: oldProjects,
      };

    case ProjectActions.FETCH_EVENTS: {
      return {
        state,
      };
    }

    case ProjectActions.FETCH_EVENTS_SUCCESS: {
      return {
        projects: action.payload,
      };
    }

    default:
      return state;
  }
}
