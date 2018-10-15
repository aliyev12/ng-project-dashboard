import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectStartComponent } from './project-start/project-start.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { KeyMilestoneEditComponent } from './project-edit/key-milestone-edit/key-milestone-edit.component';

const projectsRoutes: Routes = [
  { path: '', component: ProjectsComponent, children: [
    { path: '', component: ProjectStartComponent },
    { path: 'new', component: ProjectEditComponent, canActivate: [AuthGuard] },
    { path: ':id', component: ProjectDetailComponent },
    {
    path: ':id/new-key-milestone',
    component: KeyMilestoneEditComponent,
    canActivate: [AuthGuard]
    },
    { path: ':project-id/:key-milestone-id/edit-key-milestone', component: KeyMilestoneEditComponent, canActivate: [AuthGuard] },
    { path: ':id/edit', component: ProjectEditComponent, canActivate: [AuthGuard] }
  ] },
];

/**
 *
 *  { path: 'product-details/:id', component: ProductDetails }
 *
 * @RouteConfig([{path: '/component/:id/:id2',name: 'MyCompB', component:MyCompB}])
export class MyCompA {
    onClick(){
        this._router.navigate( ['MyCompB', {id: "someId", id2: "another ID"}]);
    }
}
 */

@NgModule({
  imports: [
    RouterModule.forChild(projectsRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class ProjectsRoutingModule {

}
