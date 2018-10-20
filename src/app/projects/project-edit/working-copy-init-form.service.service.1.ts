import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Project } from '../models/project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromProject from '../store/project.reducers';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InitFormService {
  projectForm: FormGroup;

  constructor(
    private store: Store<fromProject.FeatureState>,
    private fb: FormBuilder,
  ) { }

    /* INITIALIZING THE FORM */
    public initForm(id: number, editMode: boolean, editedItem: Project) {
      let projectName = '';
      let projectSummary = '';
      const projectKeyMilestones = this.fb.array([]);
      const projectKeyMilestoneItems = this.fb.array([]);
      const projectUpcomingKeyActivities = this.fb.array([]);
      const projectResourceAssignments = this.fb.array([]);
      const projectKeyRisks = this.fb.array([]);
      const projectRequiredDecisions = this.fb.array([]);

      if (editMode) {
        this.store
          .select('projects')
          .pipe(take(1))
          .subscribe((fromProjects: fromProject.State) => {
            const project = fromProjects.projects[id];
            console.log('here is the project from service:');
            console.log(project);

            projectName = project.name;

            projectSummary = project.summary;

            /***************/
            /* keyMilestones */
            /***************/
            if (project['keyMilestones']) {
              // for (const keyMilestone of project.keyMilestones) {
              for (let j = 0; j < project.keyMilestones.length; j++) {
                const keyMilestone = project.keyMilestones[j];

                // const projectKeyMilestoneItems = this.fb.array([]);
                if (keyMilestone['items']) {
                  // for (const keyMilestoneItem of keyMilestone.items)
                  for (let i = 0; i < keyMilestone.items.length; i++) {
                    const keyMilestoneItem = keyMilestone.items[i];

                    projectKeyMilestoneItems.push(
                      this.fb.group({
                        name: [keyMilestoneItem.name],
                        status: [keyMilestoneItem.status],
                        date: [keyMilestoneItem.date],
                      })
                    ); // end of push

                  } // end of for
                } // end of if (keyMilestone['items'])

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
                        name: this.fb.control[upcomingKeyActivityItem.name],
                      })
                    ); // end of push
                  } // end of for
                } // end of if (keyMilestone['items'])
                projectUpcomingKeyActivities.push(
                  this.fb.group({
                    name: this.fb.control[upcomingKeyActivity.name],
                    items: projectUpcomingKeyActivityItems,
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
                        name: this.fb.control[resourceAssignmentItem.name],
                      })
                    ); // end of push
                  } // end of for
                } // end of if (keyMilestone['items'])
                projectResourceAssignments.push(
                  this.fb.group({
                    name: this.fb.control[resourceAssignment.name],
                    items: projectResourceAssignmentItems,
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
                        name: this.fb.control[keyRiskItem.name],
                      })
                    ); // end of push
                  } // end of for
                } // end of if (keyMilestone['items'])
                projectKeyRisks.push(
                  this.fb.group({
                    name: this.fb.control[keyRisk.name],
                    items: projectKeyRiskItems,
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
                        name: this.fb.control[requiredDecisionItem.name],
                      })
                    ); // end of push
                  } // end of for
                } // end of if (keyMilestone['items'])
                projectRequiredDecisions.push(
                  this.fb.group({
                    name: this.fb.control[requiredDecision.name],
                    items: projectRequiredDecisionItems,
                  }) // end of this.fb.group...
                ); // end of push
              } // end of for
            } // end of if (project['keyMilestones'])
            /***************/
            /* END OF projectRequiredDecisions */
            /***************/
          }); // end of subscribe
      } // end of if (this.editMode)

      /**
        this.projectForm = this.fb.group({
        name: ['', Validators.required],
        keyMilestones: this.fb.array([this.initKeyMilestones()]),
      });

     */

      this.projectForm = this.fb.group({
        name: [projectName],
        summary: [projectSummary],
        keyMilestones: projectKeyMilestones,
        upcomingKeyActivities: projectUpcomingKeyActivities,
        resourceAssignments: projectResourceAssignments,
        keyRisks: projectKeyRisks,
        requiredDecisions: projectRequiredDecisions,
      });

      console.log(`here is the projectKeyMilestones after all stuff in service:`);
      console.log(projectKeyMilestones);



      return this.projectForm;
    }

}
