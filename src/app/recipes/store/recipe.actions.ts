import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const STORE_RECIPES = 'STORE_RECIPES';
export const FETCH_RECIPES = 'FETCH_RECIPES';
export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: {index: number, updatedRecipe: Recipe}) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {}
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class FetchEvents implements Action {
  readonly type = FETCH_EVENTS;
}

export class FetchEventsSuccess implements Action {
  readonly type = FETCH_EVENTS_SUCCESS;
  constructor(public payload: Recipe[]) { }
}

export type RecipeActions = SetRecipes | AddRecipe | UpdateRecipe | DeleteRecipe |
StoreRecipes | FetchRecipes | FetchEvents | FetchEventsSuccess ;
