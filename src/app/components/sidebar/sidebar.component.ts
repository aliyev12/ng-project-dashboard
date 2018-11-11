import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  innerWidth: any;
  isAuthenticated: boolean;
  loggedInUser: string;
  projects: Project[] = [];
  trigger;
  wrapper;
  sidebarCollapse;
  isClosed = false;
  sidebar;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private projectService: ProjectService,
    private elRef: ElementRef
      ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isAuthenticated = true;
        this.loggedInUser = auth.email;
        this.projectService.getProjects().subscribe(projects => {
          const unArchivedProjects = [];
          projects.forEach(project => {
            if (project.archived === false || !project.archived) {
              unArchivedProjects.push(project);
            }
          });
           this.projects = unArchivedProjects;
        });
      } else {
        this.isAuthenticated = false;
      }
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
    this.router.navigate(['projects/new'], {relativeTo: this.route});
  }

  ngAfterViewInit() {
    this.trigger = this.elRef.nativeElement.querySelector('.hamburger');
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
  }

  onLogout() {
    // this.store.dispatch(new AuthActions.Logout());
    this.isAuthenticated = false;
    this.authService.logout();
  }

  onProjectChanged(id: string) {
     this.projectService.projectChanged.next(id);
  }


}
