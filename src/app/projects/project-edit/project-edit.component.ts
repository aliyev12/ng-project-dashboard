import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromProject from '../store/project.reducers';
import * as ProjectActions from '../store/project.actions';
import { take } from 'rxjs/operators';
import { KeyMilestone } from '../models/key-milestone/key-milestone.model';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  id: number;
  editMode = false;
  editedItem: Project;
  projectForm: FormGroup;
  project: Project;

  keyMilestoneItems: KeyMilestone[];

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
      this.store.dispatch(
        new ProjectActions.UpdateProject({
          index: this.id,
          updatedProject: this.projectForm.value,
        })
      );
    } else {
      this.store.dispatch(new ProjectActions.AddProject(this.projectForm.value));
      console.log(this.projectForm.value);
    }
    this.onCancel();
  }

  /*************************/
  /*************************/
  /* KEY MILESTONE ACTIONS */
  /*************************/
  /*************************/

  onAddKeyMilestone() {
    (<FormArray>this.projectForm.get('keyMilestones')).push(
      this.fb.group({
        name: this.fb.control['']

        /*
        ,
        items: this.fb.group({
          name: this.fb.control[''],
          status: this.fb.control[''],
          date: this.fb.control['']
        })
        */

      }) // end of this.fb.group
    ); // end of push
  } // end of onAddKeyMilestone()

// angular reactive form array inside array push

  onAddKeyMilestoneItem(keyMilestoneItem: KeyMilestone) {
    this.keyMilestoneItems.push(keyMilestoneItem);
  }

  onDeleteKeyMilestone(index: number) {
    (<FormArray>this.projectForm.get('keyMilestones')).removeAt(index);
  }

  getKeyMilestoneControls() {
    return (<FormArray>this.projectForm.get('keyMilestones')).controls;
  }

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
          name: this.fb.control['']
        })
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
          name: this.fb.control['']
        })
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
          name: this.fb.control['']
        })
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
          name: this.fb.control['']
        })
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

  /* INITIALIZING THE FORM */
  private initForm() {
    let projectName = '';
    let projectSummary = '';
    const projectKeyMilestones = this.fb.array([]);
    const projectUpcomingKeyActivities = this.fb.array([]);
    const projectResourceAssignments = this.fb.array([]);
    const projectKeyRisks = this.fb.array([]);
    const projectRequiredDecisions = this.fb.array([]);

    if (this.editMode) {
      this.store
        .select('projects')
        .pipe(take(1))
        .subscribe((fromProjects: fromProject.State) => {
          const project = fromProjects.projects[this.id];
          projectName = project.name;
          projectSummary = project.summary;

          /***************/
          /* keyMilestones */
          /***************/
          if (project['keyMilestones']) {
            for (const keyMilestone of project.keyMilestones) {
              const projectKeyMilestoneItems = this.fb.array([]);
              if (keyMilestone['items']) {
                for (const keyMilestoneItem of keyMilestone.items) {
                projectKeyMilestoneItems.push(
                  this.fb.group({
                    name: [keyMilestoneItem.name],
                    status: [keyMilestoneItem.status],
                    date: [keyMilestoneItem.date]
                  })
                ); // end of push
                } // end of for
              } // end of if (keyMilestone['items'])
              projectKeyMilestones.push(
                this.fb.group({
                  name: [keyMilestone.name],
                  items: projectKeyMilestoneItems
                }) // end of this.fb.group...
              ); // end of push
            } // end of for
          } // end of if (project['keyMilestones'])
          /***************/
          /* END OF keyMilestones */
          /***************/


          /***************/
          /* projectUpcomingKeyActivities */
          /***************/
          if (project['upcomingKeyActivities']) {
            for (const upcomingKeyActivity of project.upcomingKeyActivities) {
              const projectUpcomingKeyActivityItems = this.fb.array([]);
              if (upcomingKeyActivity['items']) {
                for (const upcomingKeyActivityItem of upcomingKeyActivity.items) {
                  projectUpcomingKeyActivityItems.push(
                  this.fb.group({
                    name: this.fb.control[upcomingKeyActivityItem.name]
                  })
                ); // end of push
                } // end of for
              } // end of if (keyMilestone['items'])
              projectUpcomingKeyActivities.push(
                this.fb.group({
                  name: this.fb.control[upcomingKeyActivity.name],
                  items: projectUpcomingKeyActivityItems
                }) // end of this.fb.group...
              ); // end of push
            } // end of for
          } // end of if (project['keyMilestones'])
          /***************/
          /* END OF projectUpcomingKeyActivities */
          /***************/


          /***************/
          /* projectResourceAssignments */
          /***************/
          if (project['resourceAssignments']) {
            for (const resourceAssignment of project.resourceAssignments) {
              const projectResourceAssignmentItems = this.fb.array([]);
              if (resourceAssignment['items']) {
                for (const resourceAssignmentItem of resourceAssignment.items) {
                  projectResourceAssignmentItems.push(
                  this.fb.group({
                    name: this.fb.control[resourceAssignmentItem.name]
                  })
                ); // end of push
                } // end of for
              } // end of if (keyMilestone['items'])
              projectResourceAssignments.push(
                this.fb.group({
                  name: this.fb.control[resourceAssignment.name],
                  items: projectResourceAssignmentItems
                }) // end of this.fb.group...
              ); // end of push
            } // end of for
          } // end of if (project['keyMilestones'])
          /***************/
          /* END OF projectResourceAssignments */
          /***************/


          /***************/
          /* projectResourceAssignments */
          /***************/
          if (project['keyRisks']) {
            for (const keyRisk of project.keyRisks) {
              const projectKeyRiskItems = this.fb.array([]);
              if (keyRisk['items']) {
                for (const keyRiskItem of keyRisk.items) {
                  projectKeyRiskItems.push(
                  this.fb.group({
                    name: this.fb.control[keyRiskItem.name]
                  })
                ); // end of push
                } // end of for
              } // end of if (keyMilestone['items'])
              projectKeyRisks.push(
                this.fb.group({
                  name: this.fb.control[keyRisk.name],
                  items: projectKeyRiskItems
                }) // end of this.fb.group...
              ); // end of push
            } // end of for
          } // end of if (project['keyMilestones'])
          /***************/
          /* END OF projectResourceAssignments */
          /***************/


          /***************/
          /* projectRequiredDecisions */
          /***************/
          if (project['requiredDecisions']) {
            for (const requiredDecision of project.requiredDecisions) {
              const projectRequiredDecisionItems = this.fb.array([]);
              if (requiredDecision['items']) {
                for (const requiredDecisionItem of requiredDecision.items) {
                  projectRequiredDecisionItems.push(
                  this.fb.group({
                    name: this.fb.control[requiredDecisionItem.name]
                  })
                ); // end of push
                } // end of for
              } // end of if (keyMilestone['items'])
              projectRequiredDecisions.push(
                this.fb.group({
                  name: this.fb.control[requiredDecision.name],
                  items: projectRequiredDecisionItems
                }) // end of this.fb.group...
              ); // end of push
            } // end of for
          } // end of if (project['keyMilestones'])
          /***************/
          /* END OF projectRequiredDecisions */
          /***************/

        }); // end of subscribe

    } // end of if (this.editMode)

    this.projectForm = this.fb.group({
      name: [projectName],
      summary: [projectSummary],
      keyMilestones: projectKeyMilestones,
      upcomingKeyActivities: projectUpcomingKeyActivities,
      resourceAssignments: projectResourceAssignments,
      keyRisks: projectKeyRisks,
      requiredDecisions: projectRequiredDecisions
    });
  }
}


// , Validators.required
