import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromProject from '../store/project.reducers';
import * as ProjectActions from '../store/project.actions';
import { take } from 'rxjs/operators';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromProject.FeatureState>
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
      new FormGroup({
        name: new FormControl(null, Validators.required),
        items: new FormGroup({
          name: new FormControl(null, Validators.required),
          status: new FormControl(null, Validators.required),
          date: new FormControl(null, Validators.required)
        })
      }) // end of new FormGroup
    ); // end of push
  } // end of onAddKeyMilestone()

  onDeleteKeyMilestone(index: number) {
    (<FormArray>this.projectForm.get('keyMilestones')).removeAt(index);
  }

  getControls() {
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
      new FormGroup({
        name: new FormControl(null, Validators.required),
        items: new FormGroup({
          name: new FormControl(null, Validators.required),
          status: new FormControl(null, Validators.required),
          date: new FormControl(null, Validators.required)
        })
      }) // end of new FormGroup
    ); // end of push
  } // end of onAddKeyMilestone()

  onDeleteUpcomingKeyActivity(index: number) {
    (<FormArray>this.projectForm.get('keyMilestones')).removeAt(index);
  }

  getControls() {
    return (<FormArray>this.projectForm.get('keyMilestones')).controls;
  }

  /******************************************/
  /* END OF upcoming key activities actions */
  /******************************************/
  /*----------------------------------------*/



  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  /* INITIALIZING THE FORM */
  private initForm() {
    let projectName = '';
    let projectSummary = '';
    const projectKeyMilestones = new FormArray([]);
    const projectUpcomingKeyActivities = new FormArray([]);
    const projectResourceAssignments = new FormArray([]);
    const projectKeyRisks = new FormArray([]);
    const projectRequiredDecisions = new FormArray([]);

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
              const projectKeyMilestoneItems = new FormArray([]);
              if (keyMilestone['items']) {
                for (const keyMilestoneItem of keyMilestone.items) {
                projectKeyMilestoneItems.push(
                  new FormGroup({
                    name: new FormControl(keyMilestoneItem.name, Validators.required),
                    status: new FormControl(keyMilestoneItem.status, Validators.required),
                    date: new FormControl(keyMilestoneItem.date, Validators.required)
                  })
                ); // end of push
                } // end of for
              } // end of if (keyMilestone['items'])
              projectKeyMilestones.push(
                new FormGroup({
                  name: new FormControl(keyMilestone.name, Validators.required),
                  items: projectKeyMilestoneItems
                }) // end of new FormGroup...
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
              const projectUpcomingKeyActivityItems = new FormArray([]);
              if (upcomingKeyActivity['items']) {
                for (const upcomingKeyActivityItem of upcomingKeyActivity.items) {
                  projectUpcomingKeyActivityItems.push(
                  new FormGroup({
                    name: new FormControl(upcomingKeyActivityItem.name, Validators.required)
                  })
                ); // end of push
                } // end of for
              } // end of if (keyMilestone['items'])
              projectUpcomingKeyActivities.push(
                new FormGroup({
                  name: new FormControl(upcomingKeyActivity.name, Validators.required),
                  items: projectUpcomingKeyActivityItems
                }) // end of new FormGroup...
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
              const projectResourceAssignmentItems = new FormArray([]);
              if (resourceAssignment['items']) {
                for (const resourceAssignmentItem of resourceAssignment.items) {
                  projectResourceAssignmentItems.push(
                  new FormGroup({
                    name: new FormControl(resourceAssignmentItem.name, Validators.required)
                  })
                ); // end of push
                } // end of for
              } // end of if (keyMilestone['items'])
              projectResourceAssignments.push(
                new FormGroup({
                  name: new FormControl(resourceAssignment.name, Validators.required),
                  items: projectResourceAssignmentItems
                }) // end of new FormGroup...
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
              const projectKeyRiskItems = new FormArray([]);
              if (keyRisk['items']) {
                for (const keyRiskItem of keyRisk.items) {
                  projectKeyRiskItems.push(
                  new FormGroup({
                    name: new FormControl(keyRiskItem.name, Validators.required)
                  })
                ); // end of push
                } // end of for
              } // end of if (keyMilestone['items'])
              projectKeyRisks.push(
                new FormGroup({
                  name: new FormControl(keyRisk.name, Validators.required),
                  items: projectKeyRiskItems
                }) // end of new FormGroup...
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
              const projectRequiredDecisionItems = new FormArray([]);
              if (requiredDecision['items']) {
                for (const requiredDecisionItem of requiredDecision.items) {
                  projectRequiredDecisionItems.push(
                  new FormGroup({
                    name: new FormControl(requiredDecisionItem.name, Validators.required)
                  })
                ); // end of push
                } // end of for
              } // end of if (keyMilestone['items'])
              projectRequiredDecisions.push(
                new FormGroup({
                  name: new FormControl(requiredDecision.name, Validators.required),
                  items: projectRequiredDecisionItems
                }) // end of new FormGroup...
              ); // end of push
            } // end of for
          } // end of if (project['keyMilestones'])
          /***************/
          /* END OF projectRequiredDecisions */
          /***************/

        }); // end of subscribe

    } // end of if (this.editMode)

    this.projectForm = new FormGroup({
      name: new FormControl(projectName, Validators.required),
      summary: new FormControl(projectSummary, Validators.required),
      keyMilestones: projectKeyMilestones,
      upcomingKeyActivities: projectUpcomingKeyActivities,
      resourceAssignments: projectResourceAssignments,
      keyRisks: projectKeyRisks,
      requiredDecisions: projectRequiredDecisions
    });
  }
}
