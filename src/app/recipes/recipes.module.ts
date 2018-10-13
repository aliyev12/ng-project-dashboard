import { NgModule } from "@angular/core";

import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { recipeReducer } from "./store/recipe.reducers";
import { EffectsModule } from "@ngrx/effects";
import { RecipeEffects } from "./store/recipe.effects";
import { AngularFireModule } from 'angularFire2'
import { AngularFireDatabaseModule } from 'angularFire2/database'

export const firebaseCredentials = {
  apiKey: "AIzaSyDZhoHrSZgnEurG8rwT5NaitgKr-E4i3Jk",
  authDomain: "ng-recipe-book-efcae.firebaseapp.com",
  databaseURL: "https://ng-recipe-book-efcae.firebaseio.com",
  projectId: "ng-recipe-book-efcae",
  storageBucket: "ng-recipe-book-efcae.appspot.com",
  messagingSenderId: "435630702277"
  };

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeStartComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    RecipeItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule,
    StoreModule.forFeature('recipes', recipeReducer),
    EffectsModule.forFeature([RecipeEffects]),
    AngularFireModule.initializeApp(firebaseCredentials),
    AngularFireDatabaseModule
  ]
})
export class RecipesModule {}
