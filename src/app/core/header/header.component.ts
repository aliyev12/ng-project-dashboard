import {
  Component,
  OnInit
} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRecipe from '../../recipes/store/recipe.reducers';
import * as RecipeActions from '../../recipes/store/recipe.actions';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;
  navbarOpen = false;
  app_user = {
    name: 'John Doe',
    username: 'john.doe',
  };

  constructor(
    private store: Store<fromRecipe.FeatureState>
  ) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}
