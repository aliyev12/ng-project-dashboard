import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as ProjectActions from '../../store/project.actions';
import {Project} from '../../models/project.model';
import * as fromProject from '../../store/project.reducers';
import {take} from 'rxjs/operators';
import {KeyMilestone} from '../../models/key-milestone/key-milestone.model';

@Component({
  selector: 'app-key-milestone-edit',
  templateUrl: './key-milestone-edit.component.html',
  styleUrls: ['./key-milestone-edit.component.css'],
})
export class KeyMilestoneEditComponent implements OnInit {
  projectId: number;
  keyMilestoneId: number;
  editMode = false;
  editedItem: KeyMilestone;
  keyMilestoneForm: FormGroup;
  keyMilestone: KeyMilestone;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromProject.FeatureState>
  ) {}
  /**
 *
 * :project-id/:key-milestone-id/edit
 * @RouteConfig([{path: '/component/:id/:id2',name: 'MyCompB', component:MyCompB}])
export class MyCompA {
    onClick(){
        this._router.navigate( ['MyCompB', {id: "someId", id2: "another ID"}]);
    }
}
 */
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.projectId = +params['id'];
      console.log(this.projectId);
      this.keyMilestoneId = +params['key-milestone-id'];
      this.editMode = params['key-milestone-id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    // const newProject = new Project(
    //   this.projectForm.value['name'],
    //   this.projectForm.value['description'],
    //   this.projectForm.value['imagePath'],
    //   this.projectForm.value['ingredients']);

    if (this.editMode) {
      // this.store.dispatch(
      //   new ProjectActions.UpdateProject({
      //     index: this.id,
      //     updatedProject: this.projectForm.value,
      //   })
      // );
    } else {
      console.log('CHEK CHECK CHECK!!!');
      this.store.dispatch(
        new ProjectActions.AddKeyMilestone({
          projectIndex: this.projectId,
          keyMilestone: this.keyMilestoneForm.value
        })
      );

      console.log({
        projectIndex: this.projectId,
        keyMilestone: this.keyMilestoneForm.value
      });
    }
    this.onCancel();
  }

  onAddKeyMilestoneItem() {
    (<FormArray>this.keyMilestoneForm.get('items')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        status: new FormControl(null),
        date: new FormControl(null),
      })
    );
  }


  onDeleteKeyMilestoneItem(index: number) {
    (<FormArray>this.keyMilestoneForm.get('items')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  getControls() {
    return (<FormArray>this.keyMilestoneForm.get('items')).controls;
  }

  private initForm() {
    let keyMilestoneName = '';
    const keyMilestoneItems = new FormArray([]);

    /*
    if (this.editMode) {
      this.store
        .select('projects')
        .pipe(take(1))
        .subscribe((fromProjects: fromProject.State) => {
          const project = fromProjects.projects[this.id];
          // keyMilestoneName = project.keyMilestones.name;
          projectName = project.name;
          projectImagePath = project.imagePath;
          projectDescription = project.description;
          if (project['ingredients']) {
            for (const ingredient of project.ingredients) {
              projectIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/),
                  ]),
                })
              );
            }
          }
        });
    }
    */

    this.keyMilestoneForm = new FormGroup({
      name: new FormControl(keyMilestoneName, Validators.required),
      items: keyMilestoneItems,
    });
  }
}
