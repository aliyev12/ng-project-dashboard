// In this reducer, I am bundling up all the other application states

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList: fromShoppingList.State; // { ingredients: Ingredient[]; editedIngredient: Ingredient; editedIngredientIndex: number; }
  auth: fromAuth.State; // { token: string; authenticated: boolean; }
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
};
