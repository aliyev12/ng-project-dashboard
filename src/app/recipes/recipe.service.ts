import { Recipe } from "./recipe.model";
import { Injectable } from "../../../node_modules/@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      // 1,
      "A Test Recipe",
      "This is a test",
      "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg",
      [new Ingredient("Meat", 1), new Ingredient("French Fries", 20)]
    ),
    new Recipe(
      // 2,
      "Another Test Recipe",
      "This is a test",
      "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg",
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
}
