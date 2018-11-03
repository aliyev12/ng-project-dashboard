import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// const appRoutes: Routes = [
//   { path: '', redirectTo: '/projects', pathMatch: 'full' },
//   // {path: '', component: HomeComponent},
//   // {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
//   // {path: 'projects', loadChildren: './projects/projects.module#ProjectsModule'},
//   // {path: 'projects', component: ProjectsComponent},
//   // {path: 'shopping-list', component: ShoppingListComponent}
//   { path: 'projects', component: ProjectsComponent, children: [
//     { path: '', component: ProjectStartComponent, canActivate: [AuthGuard] },
//     { path: 'new', component: ProjectEditComponent, canActivate: [AuthGuard] },
//     { path: ':id', component: ProjectDetailComponent, canActivate: [AuthGuard] },
//     { path: ':id/edit', component: ProjectEditComponent, canActivate: [AuthGuard] }
//   ], canActivate: [AuthGuard] },
// ];

const routes: Routes = [
  // {path: '', redirectTo: '/projects', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: '', component: HomepageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'projects/new', component: ProjectEditComponent, canActivate: [AuthGuard] },
  {path: 'projects/:id', component: ProjectDetailComponent, canActivate: [AuthGuard] },
  {path: 'projects/edit/:id', component: ProjectEditComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent},
];

/*
const recipesRoutes: Routes = [
  { path: '', component: RecipesComponent, children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
  ] },
];
*/

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
