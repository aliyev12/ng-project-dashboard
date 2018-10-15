import { Component, OnInit, Input } from '@angular/core';
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

  // @Input()
  projectState: Observable<fromProject.State>;
  id: number;

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
      console.log(this.id);
      this.projectState = this.store.select('projects');
      console.log('DETAILS knows id, it is right below');
      console.log(this.id);
      console.log('--- id above ---');
      // this.projectState.subscribe(
      //   data => {
      //     const something = data.projects[this.id].keyMilestones;
      //     console.log('something below');
      //     console.log(something);
      //     console.log('something above');

      //   }
      // );
    });
  }

  // onAddToShoppingList() {
  //   this.store
  //     .select('projects')
  //     .pipe(take(1))
  //     .subscribe((projectState: fromProject.State) => {
  //       this.store.dispatch(
  //         new ShoppingListActions.AddIngredients(
  //           projectState.projects[this.id].ingredients
  //         )
  //       );
  //     });
  // }

  onEditProject() {
    console.log(
      'onEditProject is routing to /edit, aka project-edit-component...'
    );
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteProject() {
    this.store.dispatch(new ProjectActions.DeleteProject(this.id));
    this.router.navigate(['/projects']);
  }

  onNewKeyMilestone(id: number) {
     this.router.navigate(['new-key-milestone'], {relativeTo: this.route});
  }
}
