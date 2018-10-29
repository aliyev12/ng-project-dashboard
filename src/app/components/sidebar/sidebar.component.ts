import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
// import {Store} from '@ngrx/store';
// import * as fromAuth from '../../auth/store/auth.reducers';
// import * as AuthActions from '../../auth/store/auth.actions';
// import * as fromProject from '../../projects/store/project.reducers';
// import * as ProjectActions from '../../projects/store/project.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  // authState: Observable<fromAuth.State>;
  // projectState: Observable<fromProject.State>;
  // isAuthenticated: Observable<fromAuth.State>;
  innerWidth: any;
  isAuthenticated: boolean;
  loggedInUser: string;
  projects: Project[];
  trigger;
  overlay;
  wrapper;
  sidebarCollapse;
  isClosed = false;
  sidebar;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private projectService: ProjectService,
    // public store: Store<fromProject.FeatureState>,
    private elRef: ElementRef
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

    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });

    // this.projectState = this.store.select('projects');
    // this.authState = this.store.select('auth');
    // this.projectState.subscribe(data => {});
    // this.isAuthenticated = this.store.select('auth');
    // this.isAuthenticated.subscribe(data => {
    //   if (data.authenticated) {
    //     // this.store.dispatch(new ProjectActions.FetchProjects());
    //   }
    // });
    this.innerWidth = window.innerWidth;
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   this.innerWidth = window.innerWidth;
  //   if (this.innerWidth < 769) {
  //     this.overlay.classList.add('small');
  //   } else {
  //     this.overlay.classList.remove('small');
  //   }
  // }

  onNewProject() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngAfterViewInit() {
    this.trigger = this.elRef.nativeElement.querySelector('.hamburger');
    this.overlay = this.elRef.nativeElement.querySelector('.overlay');
    this.wrapper = this.elRef.nativeElement.querySelector('#wrapper');
    this.sidebar = this.elRef.nativeElement.querySelector('#sidebar');
    this.sidebarCollapse = this.elRef.nativeElement.querySelector('#sidebarCollapse');
  }

  hamburger_cross() {
    if (this.isClosed === true) {
      this.trigger.classList.remove('is-closed');
      this.trigger.classList.add('is-open');
      this.isClosed = false;
    } else {
      this.trigger.classList.remove('is-open');
      this.trigger.classList.add('is-closed');
      this.isClosed = true;
    }
    this.wrapper.classList.toggle('toggled');
  }

  onSidebarCollapse() {
    this.sidebar.classList.toggle('active');
    this.sidebarCollapse.classList.toggle('active');
    this.overlay.classList.toggle('active');
  }

  onDismissOrOverlay() {
    this.sidebar.classList.remove('active');
    // this.overlay.classList.remove('active');
  }

  onLogout() {
    // this.store.dispatch(new AuthActions.Logout());
  }


}
