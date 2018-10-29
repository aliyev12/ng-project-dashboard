import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
// import {Store} from '@ngrx/store';
// import * as fromApp from '../../store/app.reducers';
// import * as fromAuth from '../../auth/store/auth.reducers';
// import * as AuthActions from '../../auth/store/auth.actions';
// import * as fromProject from '../store/project.reducers';
// import * as ProjectActions from '../store/project.actions';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css'],
})
export class ProjectsListComponent implements OnInit, AfterViewInit {
  innerWidth: any;
  trigger;
  overlay;
  wrapper;
  sidebarCollapse;
  isClosed = false;
  sidebar;

  // authState: Observable<fromAuth.State>;
  // projectState: Observable<fromProject.State>;
  // isAuthenticated: Observable<fromAuth.State>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // public store: Store<fromProject.FeatureState>,
    private elRef: ElementRef
      ) {}

  ngOnInit() {

    // this.projectState = this.store.select('projects');
    this.authState = this.store.select('auth');
    this.projectState.subscribe(data => {});
    this.isAuthenticated = this.store.select('auth');
    this.isAuthenticated.subscribe(data => {
      if (data.authenticated) {
        // this.store.dispatch(new ProjectActions.FetchProjects());
      }
    });
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

  onSaveData() {
    this.store.dispatch(new ProjectActions.StoreProjects());
  }

  onFetchData() {
    this.store.dispatch(new ProjectActions.FetchProjects());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }


}
