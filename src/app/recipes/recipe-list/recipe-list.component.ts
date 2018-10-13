import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  isAuthenticated: Observable<fromAuth.State>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public store1: Store<fromApp.AppState>,
              public store2: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.store2.dispatch(new RecipeActions.FetchEvents());
    this.recipeState = this.store2.select('recipes');
    this.isAuthenticated = this.store1.select('auth');
    this.isAuthenticated.subscribe(
      data => {
        if (data.authenticated) {
          this.store2.dispatch(new RecipeActions.FetchRecipes());
        }
      }
    );
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
