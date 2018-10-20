import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Project} from '../models/project.model';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromProject from '../store/project.reducers';
import * as ProjectActions from '../store/project.actions';
import {take} from 'rxjs/operators';
import {KeyMilestone} from '../models/key-milestone/key-milestone.model';


@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
})
export class ProjectEditComponent implements OnInit {

  id: number;
  editMode = false;
  editedItem: Project;
  projectForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromProject.FeatureState>
  ) {}

  ngOnInit() {
    console.log(`ENTERING PROJECT-EDIT TS...`);

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      // If there is an ID passed into url, then editMode is true, otherwise it is false
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        new ProjectActions.UpdateProject({
          index: this.id,
          updatedProject: this.projectForm.value,
        })
      );
    } else {
      this.store.dispatch(
        new ProjectActions.AddProject(this.projectForm.value)
      );
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddNewKeyMilestone() {
    (<FormArray>this.projectForm.get('keyMilestones')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        items: new FormArray([]),
      })
    );

  }

  onAddNewUpcomingKeyActivity() {
    (<FormArray>this.projectForm.get('upcomingKeyActivities')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        items: new FormArray([]),
      })
    );
  }

  onAddKeyMilestoneItem(keyMilestone): void {
    const control = <FormArray>keyMilestone.controls.items;
    control.push(
      new FormGroup({
        name: new FormControl(null, Validators.required)
      })
    );
  }

  onAddUpcomingKeyActivityItem(upcomingKeyActivity): void {
    const control = <FormArray>upcomingKeyActivity.controls.items;
    control.push(
      new FormGroup({
        name: new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteKeyMilestone(i: number) {
    const control = <FormArray>this.projectForm.controls['keyMilestones'];
    control.removeAt(i);
  }

  onDeleteUpcomingKeyActivity(indexOfUpcomingKeyActivity: number) {
    const control = <FormArray>this.projectForm.controls['upcomingKeyActivities'];
    control.removeAt(indexOfUpcomingKeyActivity);
  }

  onDeleteKeyMilestoneItem(keyMilestone, j: number) {
    const control = <FormArray>keyMilestone.controls.items;
    control.removeAt(j);
  }

  onDeleteUpcomingKeyActivityItem(upcomingKeyActivity, indexOfUpcomingKeyActivityItem) {
    const control = <FormArray>upcomingKeyActivity.controls.items;
    control.removeAt(indexOfUpcomingKeyActivityItem);
  }



  private initForm() {
    let projectName = '';
    let projectSummary = '';
    const projectKeyMilestones = new FormArray([]);
    const projectUpcomingKeyActivities = new FormArray([]);

    if (this.editMode) {
      this.store
        .select('projects')
        .pipe(take(1))
        .subscribe((fromProjects: fromProject.State) => {
          const project = fromProjects.projects[this.id];
          projectName = project.name;
          projectSummary = project.summary;

          if (project['keyMilestones']) {
            for (const keyMilestone of project.keyMilestones) {
              const projectKeyMilestoneItems = new FormArray([]);
              for (const keyMilestoneItem of keyMilestone.items) {
                projectKeyMilestoneItems.push(
                  new FormGroup({
                    name: new FormControl(keyMilestoneItem.name),
                  })
                );
              }
              projectKeyMilestones.push(
                new FormGroup({
                  name: new FormControl(keyMilestone.name, Validators.required),
                  items: projectKeyMilestoneItems,
                })
              );
            }
          } // end if keyMilestones

          if (project['upcomingKeyActivities']) {
            for (const upcomingKeyActivity of project.upcomingKeyActivities) {
              const projectUpcomingKeyActivityItems = new FormArray([]);
              for (const upcomingKeyActivityItem of upcomingKeyActivity.items) {
                projectUpcomingKeyActivityItems.push(
                  new FormGroup({
                    name: new FormControl(upcomingKeyActivityItem.name)
                  })
                );
              }
              projectUpcomingKeyActivities.push(
                new FormGroup({
                  name: new FormControl(upcomingKeyActivity.name, Validators.required),
                  items: projectUpcomingKeyActivityItems
                })
              );
            }
          } // end if upcomingKeyActivities

        }); // end store subscribe
    } // end if editmode

    this.projectForm = new FormGroup({
      name: new FormControl(projectName, Validators.required),
      summary: new FormControl(projectSummary),
      keyMilestones: projectKeyMilestones,
      upcomingKeyActivities: projectUpcomingKeyActivities
    });
  } // end init

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
