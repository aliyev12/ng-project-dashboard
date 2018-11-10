import {BrowserModule} from '@angular/platform-browser';
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
import { ProjectService } from './services/project.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { MyDatePickerModule } from 'mydatepicker';
import { ArchiveComponent } from './components/archive/archive.component';
import { PlotterComponent } from './components/plotter/plotter.component';
import { AngularDraggableModule } from 'angular2-draggable';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    HomepageComponent,
    SidebarComponent,
    ProjectDetailComponent,
    ProjectEditComponent,
    NotFoundComponent,
    ArchiveComponent,
    PlotterComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    AngularFontAwesomeModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MyDatePickerModule,
    AngularDraggableModule
  ],
  bootstrap: [AppComponent],
  providers: [ProjectService, AuthService, AuthGuard, ScrollToService]
})
export class AppModule {}
