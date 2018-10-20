import {Component, OnInit} from '@angular/core';
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
    private store: Store<fromProject.FeatureState>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      // If there is an ID passed into url, then editMode is true, otherwise it is false
      this.editMode = params['id'] != null;
    });

    this.projectForm = this.fb.group({
      name: ['nnn', Validators.required],
      summary: [''],
      keyMilestones: this.fb.array([this.initKeyMilestones()]),
    });

    // this.initFormService.initForm(this.id, this.editMode, this.editedItem);
    console.log(`Here is the pr form: ${this.projectForm}`);
    console.log(this.projectForm);

  }

  save(formData) {
    console.log(formData.value);
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
      console.log(this.projectForm.value);
    }
    this.onCancel();
  }

  /*************************/
  /*************************/
  /* KEY MILESTONE ACTIONS */
  /*************************/
  /*************************/

  initKeyMilestones() {
    return this.fb.group({
      name: [''],
      items: this.fb.array([this.initItems()]),
    });
  }

  initItems() {
    return this.fb.group({
      name: [''],
      status: [''],
      date: [''],
    });
  }

  onAddKeyMilestone() {
    const control = <FormArray>this.projectForm.controls['keyMilestones'];
    control.push(this.initKeyMilestones());
  }

  onDeleteKeyMilestone(i: number) {
    const control = <FormArray>this.projectForm.controls['keyMilestones'];
    control.removeAt(i);
  }

  onAddKeyMilestoneItem(keyMilestone): void {
    const control = <FormArray>keyMilestone.controls.items;
    control.push(this.initItems());
  }

  removeItem(keyMilestone, j: number) {
    const control = <FormArray>keyMilestone.controls.items;
    control.removeAt(j);
  }

  // onAddKeyMilestone() {
  //   (<FormArray>this.projectForm.get('keyMilestones')).push(
  //     this.fb.group({
  //       name: this.fb.control['']
  //     }) // end of this.fb.group
  //   ); // end of push
  // } // end of onAddKeyMilestone()

  // onAddKeyMilestoneItem(index: number) {
  //   (<FormArray>this.projectForm.get('keyMilestones.' + index + '.items')).push(
  //     this.fb.group({
  //         name: this.fb.control[''],
  //         status: this.fb.control[''],
  //         date: this.fb.control['']
  //     }) // end of this.fb.group
  //   ); // end of push

  //   (<FormArray>this.projectForm.get('keyMilestones')).controls.map(
  //     something => {
  //       const somename = something.get('items').value;
  //       console.log(somename);

  //     }
  //   );

  // }

  // onDeleteKeyMilestone(index: number) {
  //   (<FormArray>this.projectForm.get('keyMilestones')).removeAt(index);
  // }

  // getKeyMilestoneControls() {
  //   return (<FormArray>this.projectForm.get('keyMilestones')).controls;
  // }
  // getKeyMilestoneItemsControls(index: number) {
  //   console.log('controls are $$$$$$$$$$');
  //   const controll = (<FormArray>this.projectForm.get('keyMilestones.0.items')).controls;
  //   const wow = controll[0].value.name;
  //   const wows = controll[1].value.name;

  //   console.log(wow);
  //   console.log(wows);
  //   console.log('controls are $$$$$$$$$$');

  //   return (<FormArray>this.projectForm.get('keyMilestones.0.items')).controls;
  // }

  /********************************/
  /* END OF key milestone actions */
  /********************************/
  /*------------------------------*/

  /***********************************/
  /***********************************/
  /* UPCOMING KEY ACTIVITIES ACTIONS */
  /***********************************/
  /***********************************/

  onAddUpcomingKeyActivity() {
    (<FormArray>this.projectForm.get('upcomingKeyActivities')).push(
      this.fb.group({
        name: this.fb.control[''],
        items: this.fb.group({
          name: this.fb.control[''],
        }),
      }) // end of this.fb.group
    ); // end of push
  } // end of onAddKeyMilestone()

  onDeleteUpcomingKeyActivity(index: number) {
    (<FormArray>this.projectForm.get('upcomingKeyActivities')).removeAt(index);
  }

  getUpcomingKeyActivityControls() {
    return (<FormArray>this.projectForm.get('upcomingKeyActivities')).controls;
  }

  /******************************************/
  /* END OF upcoming key activities actions */
  /******************************************/
  /*----------------------------------------*/

  /********************************/
  /********************************/
  /* RESOURCE ASSIGNMENTS ACTIONS */
  /********************************/
  /********************************/

  onAddResourceAssignment() {
    (<FormArray>this.projectForm.get('resourceAssignments')).push(
      this.fb.group({
        name: this.fb.control[''],
        items: this.fb.group({
          name: this.fb.control[''],
        }),
      }) // end of this.fb.group
    ); // end of push
  } // end of onAddKeyMilestone()

  onDeleteResourceAssignment(index: number) {
    (<FormArray>this.projectForm.get('resourceAssignments')).removeAt(index);
  }

  getResourceAssignmentControls() {
    return (<FormArray>this.projectForm.get('resourceAssignments')).controls;
  }

  /***************************************/
  /* END OF resource assignments actions */
  /***************************************/
  /*-------------------------------------*/

  /*********************/
  /*********************/
  /* KEY RISKS ACTIONS */
  /*********************/
  /*********************/

  onAddKeyRisk() {
    (<FormArray>this.projectForm.get('keyRisks')).push(
      this.fb.group({
        name: this.fb.control[''],
        items: this.fb.group({
          name: this.fb.control[''],
        }),
      }) // end of this.fb.group
    ); // end of push
  } // end of onAddKeyRisk()

  onDeleteKeyRisk(index: number) {
    (<FormArray>this.projectForm.get('keyRisks')).removeAt(index);
  }

  getKeyRiskControls() {
    return (<FormArray>this.projectForm.get('keyRisks')).controls;
  }

  /***************************/
  /* END OF key risk actions */
  /***************************/
  /*-------------------------*/

  /******************************/
  /******************************/
  /* REQUIRED DECISIONS ACTIONS */
  /******************************/
  /******************************/

  onAddRequiredDecision() {
    (<FormArray>this.projectForm.get('requiredDecisions')).push(
      this.fb.group({
        name: this.fb.control[''],
        items: this.fb.group({
          name: this.fb.control[''],
        }),
      }) // end of this.fb.group
    ); // end of push
  } // end of onAddKeyRisk()

  onDeleteRequiredDecision(index: number) {
    (<FormArray>this.projectForm.get('requiredDecisions')).removeAt(index);
  }

  getRequiredDecisionControls() {
    return (<FormArray>this.projectForm.get('requiredDecisions')).controls;
  }

  /*************************************/
  /* END OF required decisions actions */
  /*************************************/
  /*-----------------------------------*/

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

// here used to be the initForm

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
