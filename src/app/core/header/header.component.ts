import {Component, OnInit, OnDestroy} from '@angular/core';
import {RecipeService} from '../../recipes/recipe.service';
import {Recipe} from '../../recipes/recipe.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Response} from '@angular/http';

import {DataStorageService} from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  navbarOpen = false;
  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit() {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  ngOnDestroy() {
  }
}
