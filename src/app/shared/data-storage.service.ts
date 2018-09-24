import {Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();

    return this.http.put('https://ng-recipe-book-efcae.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();

    /*return */this.http
      .get('https://ng-recipe-book-efcae.firebaseio.com/recipes.json?auth=' + token)
        .map(
          (response: Response) => {
            const recipes: Recipe[] = response.json();
            for (let recipe of recipes) {
              if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
              }
            }
            return recipes;
          }
        )
        .subscribe(
          (recipes: Recipe[]) => {
            this.recipeService.setRecipes(recipes);
          }
        );
      // .map((response: Response) => {
      //   const data = response.json();
      //   // for (const recipe of data) {
      //   //   // do something to each recipe
      //   // }
      //   return data;
      // })
      // .catch((error: Response) => {
      //   return Observable.throw('Something went wrong');
      // });
  }
}
