import {BrowserModule} from '@angular/platform-browser';
import { ProjectService } from './services/project.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {NgModule} from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProjectStartComponent } from './components/project-start/project-start.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
// import { ProjectsListComponent } from './components/projects-list/projects-list.component';


@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    HomepageComponent,
    SidebarComponent,
    ProjectStartComponent,
    ProjectDetailComponent,
    ProjectEditComponent,
    // ProjectsListComponent,
    NotFoundComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
  providers: [ProjectService, AuthService, AuthGuard]
})
export class AppModule {}
