import {Component, OnInit} from '@angular/core';
import {Project} from '../../models/project.model';
// import {Observable} from 'rxjs';
// import * as fromProject from '../store/project.reducers';
import {ActivatedRoute, Router, Params} from '@angular/router';
// import {Store} from '@ngrx/store';
// import * as fromAuth from '../../auth/store/auth.reducers';
// import {take} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {ProjectService} from '../../services/project.service';
import {FlashMessagesService} from 'angular2-flash-messages';
// import * as ProjectActions from '../store/project.actions';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit {
  showDropdown = false;
  isAuthenticated: boolean;
  loggedInUser: string;
  // projectState: Observable<fromProject.State>;
  id: string;
  project: Project;
  projects: Project[];
  editorContent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private projectService: ProjectService,
    private flashMessage: FlashMessagesService // private store: Store<fromProject.FeatureState>
  ) {}

  ngOnInit() {
    // this.store.select('auth').subscribe((authState: fromAuth.State) => {
    //   this.isAuthenticated = authState.authenticated;
    // });

    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isAuthenticated = true;
        this.loggedInUser = auth.email;
      } else {
        this.isAuthenticated = false;
      }
    });

    // Get ID from URL
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.projectService.getProject(this.id).subscribe(project => {
      if (project !== null) {
        // Do something if project exists
      }
      this.project = project;
      console.log('project');
      console.log(this.project);



    });

    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });

    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params['id'];
    //   this.projectState = this.store.select('projects');
    //   this.projectState.subscribe(
    //     data => {
    //       this.editorContent = data.projects[this.id].summary;
    //     }
    //   );
    // });
  }

  onEditProject() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteProject() {
    if (confirm('Are you sure?')) {
      this.projectService.deleteProject(this.project);
      this.flashMessage.show('Project removed', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      this.router.navigate(['/projects']);
    }

    // this.store.dispatch(new ProjectActions.DeleteProject(this.id));
    // this.router.navigate(['/projects']);
  }

  getBulletLetter(j) {
    const lettersArray = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ];
    if (j > lettersArray.length - 1) {
      return '#' + (j - 25);
    } else {
      return lettersArray[j];
    }
  }
}
