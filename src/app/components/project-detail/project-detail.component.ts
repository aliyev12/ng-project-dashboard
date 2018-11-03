import {Component, OnInit} from '@angular/core';
import {Project} from '../../models/project.model';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ProjectService} from '../../services/project.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit {
  showDropdown = false;
  isAuthenticated: boolean;
  loggedInUser: string;
  id: string;
  project: Project;
  projectIsLoaded = false;
  projects: Project[];
  editorContent;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private projectService: ProjectService,
    private flashMessage: FlashMessagesService // private store: Store<fromProject.FeatureState>
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isAuthenticated = true;
        this.loggedInUser = auth.email;
        console.log('Is Authenticated!');
      } else {
        this.isAuthenticated = false;
      }
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.projectService.getProject(params['id']).subscribe(project => {
        this.projectIsLoaded = true;
        this.isLoading = false;
        this.project = project;
      });
      this.projectService.getProjects().subscribe(projects => {
        this.projects = projects;
      });
    });

    console.log(`this.id = ${this.id}`);
    console.log(`this.project = `);
    console.log(this.project);
    setTimeout(() => {
      console.log(`this.project 2 s later = `);
    console.log(this.project);
    }, 2000);
    console.log();
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
