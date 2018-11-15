import {Component, OnInit} from '@angular/core';
import {Project} from '../../models/project.model';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ProjectService} from '../../services/project.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  animations: [
    trigger('divState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800))
    ]) // end of trigger
  ] // end of animations
})
export class ProjectDetailComponent implements OnInit {
  state = 'normal';
  showDropdown = false;
  isAuthenticated: boolean;
  loggedInUser: string;
  id: string;
  project: Project;
  projectIsLoaded = false;
  projects: Project[] = [];
  editorContent;
  isLoading = true;
  showHideAddKMDateButton = 'none';
  dates = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private projectService: ProjectService
    // private flashMessage: FlashMessagesService // private store: Store<fromProject.FeatureState>
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isAuthenticated = true;
        this.loggedInUser = auth.email;
      } else {
        this.isAuthenticated = false;
      }
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.projectService.projectChanged.next(params['id']);
      this.projectService.getProject(params['id']).subscribe(project => {
        this.projectIsLoaded = true;
        this.isLoading = false;
        this.project = project;
      });
      this.projectService.getProjects().subscribe(projects => {
        this.projects = projects;
      });
    });

    this.projectService.getProject(this.id).subscribe(project => {
      if (project) {
        project.keyMilestones.map(km => {
          this.dates.push(km.date);
        });
      }
    });

  }

  onAnimate() {
    if (this.state === 'normal') {
      this.state = 'highlighted';
    } else {
      this.state = 'normal';
    }
  }

  onKMMouseEnter(index: number) {
    const indexPlusOne = index + 1;
    const keyMilestoneDateAddShowHideButton = document.querySelector(`#keyMilestoneDateAddShowHideButton-${indexPlusOne}`);
    keyMilestoneDateAddShowHideButton.setAttribute('style', 'visibility: visible');
    // keyMilestoneDateAddShowHideButton.innerHTML = '<p>Mouse entered</p>';
     // setAttribute(qualifiedName: string, value: string): void;
    // keyMilestoneDateAddShowHideButton.toggleAttribute
    // keyMilestoneDateAddShowHideButton.hasAttribute
    // this.showHideAddKMDateButton = 'inline-block';
  }

  onKMMouseLeave(index: number) {
    const indexPlusOne = index + 1;
    const keyMilestoneDateAddShowHideButton = document.querySelector(`#keyMilestoneDateAddShowHideButton-${indexPlusOne}`);
    keyMilestoneDateAddShowHideButton.setAttribute('style', 'visibility: hidden');
    // keyMilestoneDateAddShowHideButton.innerHTML = '<p>Mouse Left</p>';
  }

  onEditProject() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteProject() {
    if (confirm('Are you sure?')) {
      this.projectService.deleteProject(this.project);
      // this.flashMessage.show('Project removed', {
      //   cssClass: 'alert-success',
      //   timeout: 4000,
      // });
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

  onKeyMilestoneDateAddShowHideButton(kmIndex) {
    this.project.keyMilestones[kmIndex].date = {
      date: {
        day: 28,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      },
      jsdate: {
        nanoseconds: 0,
        seconds: new Date().getTime(),
      },
      formatted: `${new Date().getMonth() + 1}/28/${new Date().getFullYear()}`,
      epoc: new Date().getTime()
    };
    console.log(`below is what I'm inserting into date`);
    console.log(this.project.keyMilestones[kmIndex].date);

    this.projectService.updateProject(this.id, this.project);
  }
}
