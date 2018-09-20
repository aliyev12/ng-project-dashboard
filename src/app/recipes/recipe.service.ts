import { Recipe } from "./recipe.model";
import { Injectable } from "../../../node_modules/@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      // 1,
      "A Test Recipe",
      "This is a test",
      "https://cdn.pixabay.com/photo/2017/06/29/20/09/mexican-2456038_1280.jpg",
      [new Ingredient("Meat", 1), new Ingredient("French Fries", 20)]
    ),
    new Recipe(
      // 2,
      "Another Test Recipe",
      "This is a test",
      "https://cdn.pixabay.com/photo/2014/06/16/23/10/spice-370114_1280.jpg",
      [new Ingredient("Meat", 5), new Ingredient("Pickles", 300)]
    )
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  // getRecipe(id: number) {
  //   const recipe = this.recipes.find(
  //     (r) => {
  //       return r.id === id;
  //     }
  //   );
  //   return recipe;
  // }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
