import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromRecepy from '../store/recipe.reducers';
import {Observable} from 'rxjs';
import * as RecipeActions from '../store/recipe.actions';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  showDropdown = false;
  isAuthenticated: boolean;

  // @Input()
  recipeState: Observable<fromRecepy.State>;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecepy.FeatureState>
  ) {}

  ngOnInit() {
    this.store.select('auth').subscribe((authState: fromAuth.State) => {
      this.isAuthenticated = authState.authenticated;
    });

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeState = this.store.select('recipes');
    });
  }

  onAddToShoppingList() {
    this.store
      .select('recipes')
      .pipe(take(1))
      .subscribe((recipeState: fromRecepy.State) => {
        this.store.dispatch(
          new ShoppingListActions.AddIngredients(
            recipeState.recipes[this.id].ingredients
          )
        );
      });
  }

  onEditRecipe() {
    console.log(
      'onEditRecipe is routing to /edit, aka recipe-edit-component...'
    );
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
