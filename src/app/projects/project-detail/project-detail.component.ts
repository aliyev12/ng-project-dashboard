import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Project } from '../models/project.model';
import { Observable } from 'rxjs';
import * as fromProject from '../store/project.reducers';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../auth/store/auth.reducers';
import { take } from 'rxjs/operators';
import * as ProjectActions from '../store/project.actions';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  showDropdown = false;
  isAuthenticated: boolean;
  projectState: Observable<fromProject.State>;
  id: number;
  editorContent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromProject.FeatureState>
  ) {}

  ngOnInit() {
    this.store.select('auth').subscribe((authState: fromAuth.State) => {
      this.isAuthenticated = authState.authenticated;
    });

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.projectState = this.store.select('projects');
      this.projectState.subscribe(
        data => {
          this.editorContent = data.projects[this.id].summary;
        }
      );
    });
  }

  onEditProject() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteProject() {
    this.store.dispatch(new ProjectActions.DeleteProject(this.id));
    this.router.navigate(['/projects']);
  }

  onNewKeyMilestone(id: number) {
     this.router.navigate(['new-key-milestone'], {relativeTo: this.route});
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
