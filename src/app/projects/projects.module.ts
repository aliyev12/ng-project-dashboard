import { NgModule } from '@angular/core';

import { ProjectsComponent } from './projects.component';
import { ProjectStartComponent } from './project-start/project-start.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectItemComponent } from './projects-list/project-item/project-item.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from './projects-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { projectReducer } from './store/project.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from './store/project.effects';
import { AngularFireModule } from 'angularFire2';
import { AngularFireDatabaseModule } from 'angularFire2/database';
import { KeyMilestoneEditComponent } from './project-edit/key-milestone-edit/key-milestone-edit.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

export const firebaseCredentials = {
  apiKey: 'AIzaSyDZhoHrSZgnEurG8rwT5NaitgKr-E4i3Jk',
  authDomain: 'ng-project-book-efcae.firebaseapp.com',
  databaseURL: 'https://ng-project-book-efcae.firebaseio.com',
  projectId: 'ng-project-book-efcae',
  storageBucket: 'ng-project-book-efcae.appspot.com',
  messagingSenderId: '435630702277'
  };

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectStartComponent,
    ProjectsListComponent,
    ProjectEditComponent,
    ProjectDetailComponent,
    ProjectItemComponent,
    KeyMilestoneEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectsRoutingModule,
    SharedModule,
    StoreModule.forFeature('projects', projectReducer),
    EffectsModule.forFeature([ProjectEffects]),
    AngularFireModule.initializeApp(firebaseCredentials),
    AngularFireDatabaseModule,
    ScrollToModule.forRoot()
  ]
})
export class ProjectsModule {}
