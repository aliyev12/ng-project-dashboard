// import {
//   Resolve,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
// } from '@angular/router';
// import {RecipeService} from '../../recipe.service';
// import {Injectable} from '@angular/core';
// import {Observable} from 'rxjs';
// import { Ingredient } from '../../../shared/ingredient.model';

// interface Recipe {
//   id: number;
//   name: string;
//   description: string;
//   imagePath: string;
//   ingredients: Ingredient[];
// }

// @Injectable()
// export class RecipeItemResolver implements Resolve<Recipe> {
//   constructor(private recipeService: RecipeService) {}

//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<Recipe> | Promise<Recipe> | Recipe {
//     return this.recipeService.getRecipe(+route.params['id']);
//   }
// }
