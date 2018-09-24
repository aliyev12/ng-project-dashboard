import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
     const token = this.authService.getToken();
    // const headers = new HttpHeaders().set('Authorization', 'Bearer some_password');

    // return this.httpClient.put('https://ng-recipe-book-efcae.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token)
    //   // headers: headers
    // });

    const req = new HttpRequest(
      'PUT',
      'https://ng-recipe-book-efcae.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      {
        reportProgress: true,
        // params: new HttpParams().set('auth', token),
      }
    );
    // const req = new HttpRequest('PUT', 'https://ng-recipe-book-efcae.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {reportProgress: true});

    return this.httpClient.request(req);
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.httpClient
      .get<Recipe[]>(
        'https://ng-recipe-book-efcae.firebaseio.com/recipes.json',
        {
          observe: 'body',
          responseType: 'json',
          params: new HttpParams().set('auth', token),
        }
      )
      .map(recipes => {
        // const recipes: Recipe[] = response.json();
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
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
