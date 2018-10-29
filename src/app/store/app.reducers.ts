// In this reducer, I am bundling up all the other application states
import * as fromAuth from '../auth/store/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';
import { State } from '../projects/store/project.reducers';

export interface AppState {
  auth: fromAuth.State; // { token: string; authenticated: boolean; }
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer
};



