import {Project} from '../models/project.model';
import * as ProjectActions from './project.actions';
import * as fromApp from '../../store/app.reducers';
import {HttpParams, HttpClient, HttpRequest} from '@angular/common/http';
import { KeyMilestone } from '../models/key-milestone/key-milestone.model';
import { KeyMilestoneItem } from '../models/key-milestone/key-milestone-item.model';
import { UpcomingKeyActivity } from '../models/upcoming-key-activity/upcoming-key-activity.model';
import { UpcomingKeyActivityItem } from '../models/upcoming-key-activity/upcoming-key-activity-item.model';
import { ResourceAssignment } from '../models/resource-assignment/resource-assignment.model';
import { ResourceAssignmentItem } from '../models/resource-assignment/resource-assignment-item.model';
import { KeyRisk } from '../models/key-risk/key-risk.model';
import { KeyRiskItem } from '../models/key-risk/key-risk-item.model';
import { RequiredDecision } from '../models/required-decision/required-decision.model';
import { RequiredDecisionItem } from '../models/required-decision/required-decision-item.model';

export interface FeatureState extends fromApp.AppState {
  projects: State;
}

export interface State {
  projects: Project[];
}

const initialState: State = {
  projects: [
    new Project(
      'CSAT 2.0 Environment',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto repellendus corrupti numquam ',
      [new KeyMilestone(
        'Continuing Diagnostic Monitoring Phase 25',
        [new KeyMilestoneItem(
          'Phase I completed',
          5,
          new Date('January 31 1980 12:30')
          )]
        )],
      [new UpcomingKeyActivity(
        'test',
        [new UpcomingKeyActivityItem(
          'test1'
          )]
        )],
      [new ResourceAssignment(
        'test',
        [new ResourceAssignmentItem(
          'test1'
          )]
        )],
      [new KeyRisk(
        'test',
        [new KeyRiskItem(
          'test1'
          )]
        )],
      [new RequiredDecision(
        'test',
        [new RequiredDecisionItem(
          'test1'
          )]
        )]
    )
  ] // end of projects array declaration.
};

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

    default:
      return state;
  }
}
