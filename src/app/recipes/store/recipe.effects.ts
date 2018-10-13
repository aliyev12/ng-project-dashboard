import {Effect, Actions} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as RecipeActions from '../store/recipe.actions';
import {switchMap, withLatestFrom, map, tap} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import * as fromRecipe from '../store/recipe.reducers';
import {Store} from '@ngrx/store';
import {FirebaseService} from '../firebase.service';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$.ofType(RecipeActions.FETCH_RECIPES).pipe(
    switchMap((action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>(
        'https://ng-recipe-book-efcae.firebaseio.com/recipes.json',
        {
          observe: 'body',
          responseType: 'json',
        }
      );
    }),
    map(recipes => {
      for (const recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return {
        type: RecipeActions.SET_RECIPES,
        payload: recipes,
      };
    })
  );

  @Effect({dispatch: false})
  recipeStore = this.actions$.ofType(RecipeActions.STORE_RECIPES).pipe(
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      const req = new HttpRequest(
        'PUT',
        'https://ng-recipe-book-efcae.firebaseio.com/recipes.json',
        state.recipes,
        {reportProgress: true}
      );
      return this.httpClient.request(req);
    })
  );

  @Effect()
  eventsStore = this.actions$.ofType(RecipeActions.FETCH_EVENTS).pipe( // filtering actions
  switchMap(() => this.firebaseService.items
  .do((payload) => new RecipeActions.FetchEventsSuccess(payload))
  ));


  constructor(
    private actions$: Actions,
    private router: Router,
    private httpClient: HttpClient,
    private store: Store<fromRecipe.FeatureState>,
    private firebaseService: FirebaseService
  ) {}
}
