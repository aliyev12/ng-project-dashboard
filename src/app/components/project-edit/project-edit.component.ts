import {Component, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import {Project} from '../../models/project.model';
import {
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {take} from 'rxjs/operators';

import {
  ScrollToService,
  ScrollToConfigOptions,
} from '@nicky-lenaers/ngx-scroll-to';
import {forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ProjectService} from '../../services/project.service';
// import {FlashMessagesService} from 'angular2-flash-messages';
import {Subscription} from 'rxjs';
import {Promise} from 'q';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProjectEditComponent),
      multi: true,
    },
  ],
})
export class ProjectEditComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  options = this.projectService.getWisiwigConfiguration();
  id: string;
  editMode = false;
  editedItem: Project;
  projectForm: FormGroup;
  project: Project;
  description;
  model: any; /** CONTENT OF RICH TEXT EDITOR OF SUMMARY */
  config: Object = {
  charCounterCount: false,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private _scrollToService: ScrollToService,
    // private flashMessage: FlashMessagesService,
    private elRef: ElementRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      if (this.editMode) {
      this.projectService.getProject(this.id).subscribe(project => {
        this.project = project;
        this.projectForm.patchValue({
          name: project.name,
          summary: project.summary,
        });
      });
      }
      this.initForm();
    });
    this.model = this.projectForm.controls.summary.value;
  }

  ngAfterViewInit() {
    this.description = this.elRef.nativeElement.querySelector('#description');
  }

  onSubmit() {
    if (this.editMode) {
      this.projectService.updateProject(this.id, this.projectForm.value);
    } else {
      this.projectService.newProject(this.projectForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate([`projects/${this.id}`]);
  }

  onSetKeyMilestoneDateStatus(i) {

  }

  /** ADDING MAIN BULLETS */
  onAddNewKeyMilestone() {
    (<FormArray>this.projectForm.get('keyMilestones')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        status: new FormControl(null),
        date: new FormControl(null),
        items: new FormArray([]),
      })
    );
    const length = (<FormArray>this.projectForm.get('keyMilestones')).length;
    const indexOfLastItem = length - 1;
    const destination = 'keyMilestone-' + indexOfLastItem;
    const config: ScrollToConfigOptions = {
      container: 'keyMilestonesCardBody',
      target: destination,
      duration: 2000,
      easing: 'easeOutElastic',
      offset: 0,
    };
    this._scrollToService.scrollTo(config);
  }

  onAddNewUpcomingKeyActivity() {
    (<FormArray>this.projectForm.get('upcomingKeyActivities')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        items: new FormArray([]),
      })
    );
    const length = (<FormArray>this.projectForm.get('upcomingKeyActivities'))
      .length;
    const indexOfLastItem = length - 1;
    const destination = 'upcomingKeyActivity-' + indexOfLastItem;
    const config: ScrollToConfigOptions = {
      container: 'upcomingKeyActivities',
      target: destination,
      duration: 2000,
      easing: 'easeOutElastic',
      offset: 0,
    };
    this._scrollToService.scrollTo(config);
  }

  onNewResourceAssignment() {
    (<FormArray>this.projectForm.get('resourceAssignments')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        items: new FormArray([]),
      })
    );
    const length = (<FormArray>this.projectForm.get('resourceAssignments'))
      .length;
    const indexOfLastItem = length - 1;
    const destination = 'resourceAssignment-' + indexOfLastItem;
    const config: ScrollToConfigOptions = {
      container: 'resourceAssignments',
      target: destination,
      duration: 2000,
      easing: 'easeOutElastic',
      offset: 0,
    };
    this._scrollToService.scrollTo(config);
  }

  onNewKeyRisk() {
    (<FormArray>this.projectForm.get('keyRisks')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        items: new FormArray([]),
      })
    );
    const length = (<FormArray>this.projectForm.get('keyRisks')).length;
    const indexOfLastItem = length - 1;
    const destination = 'keyRisk-' + indexOfLastItem;
    const config: ScrollToConfigOptions = {
      container: 'keyRisks',
      target: destination,
      duration: 2000,
      easing: 'easeOutElastic',
      offset: 0,
    };
    this._scrollToService.scrollTo(config);
  }

  onNewRequiredDecision() {
    (<FormArray>this.projectForm.get('requiredDecisions')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        items: new FormArray([]),
      })
    );
    const length = (<FormArray>this.projectForm.get('requiredDecisions'))
      .length;
    const indexOfLastItem = length - 1;
    const destination = 'requiredDecision-' + indexOfLastItem;
    const config: ScrollToConfigOptions = {
      container: 'requiredDecisions',
      target: destination,
      duration: 2000,
      easing: 'easeOutElastic',
      offset: 0,
    };
    this._scrollToService.scrollTo(config);
  }

  /** ITEMS */
  onAddKeyMilestoneItem(keyMilestone): void {
    const control = <FormArray>keyMilestone.controls.items;
    control.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
      })
    );
  }

  onAddUpcomingKeyActivityItem(upcomingKeyActivity): void {
    const control = <FormArray>upcomingKeyActivity.controls.items;
    control.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
      })
    );
  }

  onAddResourceAssignmentItem(resourceAssignment): void {
    const control = <FormArray>resourceAssignment.controls.items;
    control.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
      })
    );
  }

  onAddKeyRiskItem(keyRisk): void {
    const control = <FormArray>keyRisk.controls.items;
    control.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
      })
    );
  }

  onAddRequiredDecisionItem(requiredDecision): void {
    const control = <FormArray>requiredDecision.controls.items;
    control.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
      })
    );
  }

  /** DELETE */
  onDeleteKeyMilestone(i: number) {
    if (confirm('Are you sure you want to delete this Key Milestone?')) {
      const control = <FormArray>this.projectForm.controls['keyMilestones'];
      control.removeAt(i);
    }
  }

  onDeleteUpcomingKeyActivity(indexOfUpcomingKeyActivity: number) {
    if (
      confirm('Are you sure you want to delete this Upcoming Key Activity?')
    ) {
      const control = <FormArray>(
        this.projectForm.controls['upcomingKeyActivities']
      );
      control.removeAt(indexOfUpcomingKeyActivity);
    }
  }

  onDeleteResourceAssignment(indexOfResourceAssignment: number) {
    if (confirm('Are you sure you want to delete this Resource Assignment?')) {
      const control = <FormArray>(
        this.projectForm.controls['resourceAssignments']
      );
      control.removeAt(indexOfResourceAssignment);
    }
  }

  onDeleteKeyRisk(indexOfKeyRisk: number) {
    if (confirm('Are you sure you want to delete this Key Risk?')) {
      const control = <FormArray>this.projectForm.controls['keyRisks'];
      control.removeAt(indexOfKeyRisk);
    }
  }

  onDeleteRequiredDecision(indexOfRequiredDecision: number) {
    if (confirm('Are you sure you want to delete this Required Decision?')) {
      const control = <FormArray>this.projectForm.controls['requiredDecisions'];
      control.removeAt(indexOfRequiredDecision);
    }
  }

  /** DELETE ITEMS */
  onDeleteKeyMilestoneItem(keyMilestone, j: number) {
    if (confirm('Are you sure you want to delete this Key Milestone Item?')) {
      const control = <FormArray>keyMilestone.controls.items;
      control.removeAt(j);
    }
  }

  onDeleteUpcomingKeyActivityItem(
    upcomingKeyActivity,
    indexOfUpcomingKeyActivityItem
  ) {
    if (
      confirm(
        'Are you sure you want to delete this Upcoming Key Activity Item?'
      )
    ) {
      const control = <FormArray>upcomingKeyActivity.controls.items;
      control.removeAt(indexOfUpcomingKeyActivityItem);
    }
  }

  onDeleteResourceAssignmentItem(
    resourceAssignment,
    indexOfResourceAssignmentItem
  ) {
    if (
      confirm('Are you sure you want to delete this Resource Assignment Item?')
    ) {
      const control = <FormArray>resourceAssignment.controls.items;
      control.removeAt(indexOfResourceAssignmentItem);
    }
  }

  onDeleteKeyRiskItem(keyRisk, indexOfKeyRiskItem) {
    if (confirm('Are you sure you want to delete this Key Risk Item?')) {
      const control = <FormArray>keyRisk.controls.items;
      control.removeAt(indexOfKeyRiskItem);
    }
  }

  onDeleteRequiredDecisionItem(requiredDecision, indexOfRequiredDecisionItem) {
    if (
      confirm('Are you sure you want to delete this Required Decision Item?')
    ) {
      const control = <FormArray>requiredDecision.controls.items;
      control.removeAt(indexOfRequiredDecisionItem);
    }
  }

  /** INIT FORM */
  private initForm() {
    let projectName = '';
    let projectSummary = '';
    const projectKeyMilestones = new FormArray([]);
    const projectUpcomingKeyActivities = new FormArray([]);
    const projectResourceAssignments = new FormArray([]);
    const projectKeyRisks = new FormArray([]);
    const projectRequiredDecisions = new FormArray([]);

    if (this.editMode) {
      this.projectService.getProject(this.id).subscribe(project => {
        projectName = project.name;
        projectSummary = project.summary;

        if (project.keyMilestones) {
          for (const keyMilestone of project.keyMilestones) {
            const projectKeyMilestoneItems = new FormArray([]);
            if (keyMilestone.items) {
              for (const keyMilestoneItem of keyMilestone.items) {
                projectKeyMilestoneItems.push(
                  new FormGroup({
                    name: new FormControl(keyMilestoneItem.name),
                  })
                );
              }
            }
            projectKeyMilestones.push(
              new FormGroup({
                name: new FormControl(keyMilestone.name, Validators.required),
                status: new FormControl(keyMilestone.status),
                date: new FormControl(keyMilestone.date),
                items: projectKeyMilestoneItems,
              })
            );
          }
        } // end if keyMilestones

        if (project.upcomingKeyActivities) {
          for (const upcomingKeyActivity of project.upcomingKeyActivities) {
            const projectUpcomingKeyActivityItems = new FormArray([]);
            for (const upcomingKeyActivityItem of upcomingKeyActivity.items) {
              projectUpcomingKeyActivityItems.push(
                new FormGroup({
                  name: new FormControl(upcomingKeyActivityItem.name),
                })
              );
            }
            projectUpcomingKeyActivities.push(
              new FormGroup({
                name: new FormControl(
                  upcomingKeyActivity.name,
                  Validators.required
                ),
                items: projectUpcomingKeyActivityItems,
              })
            );
          }
        } // end if upcomingKeyActivities

        if (project.resourceAssignments) {
          for (const resourceAssignment of project.resourceAssignments) {
            const projectResourceAssignmentItems = new FormArray([]);
            for (const resourceAssignmentItem of resourceAssignment.items) {
              projectResourceAssignmentItems.push(
                new FormGroup({
                  name: new FormControl(resourceAssignmentItem.name),
                })
              );
            }
            projectResourceAssignments.push(
              new FormGroup({
                name: new FormControl(
                  resourceAssignment.name,
                  Validators.required
                ),
                items: projectResourceAssignmentItems,
              })
            );
          }
        } // end if resourceAssignments

        if (project.keyRisks) {
          for (const keyRisk of project.keyRisks) {
            const projectKeyRiskItems = new FormArray([]);
            for (const keyRiskItem of keyRisk.items) {
              projectKeyRiskItems.push(
                new FormGroup({
                  name: new FormControl(keyRiskItem.name),
                })
              );
            }
            projectKeyRisks.push(
              new FormGroup({
                name: new FormControl(keyRisk.name, Validators.required),
                items: projectKeyRiskItems,
              })
            );
          }
        } // end if keyRisks

        if (project.requiredDecisions) {
          for (const requiredDecision of project.requiredDecisions) {
            const projectRequiredDecisionItems = new FormArray([]);
            for (const requiredDecisionItem of requiredDecision.items) {
              projectRequiredDecisionItems.push(
                new FormGroup({
                  name: new FormControl(requiredDecisionItem.name),
                })
              );
            }
            projectRequiredDecisions.push(
              new FormGroup({
                name: new FormControl(
                  requiredDecision.name,
                  Validators.required
                ),
                items: projectRequiredDecisionItems,
              })
            );
          }
        } // end if requiredDecisions
      }); /************************* */
    } // end if editmode

    this.projectForm = new FormGroup({
      name: new FormControl(projectName, Validators.required),
      summary: new FormControl(projectSummary),
      keyMilestones: projectKeyMilestones,
      upcomingKeyActivities: projectUpcomingKeyActivities,
      resourceAssignments: projectResourceAssignments,
      keyRisks: projectKeyRisks,
      requiredDecisions: projectRequiredDecisions,
    });
  } // end init

  /** METHOD BELOW IS FOR SUB BULETS */
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

  /** ALL METHODS BELOW ARE FOR RICH TEXT EDITOR OF SUMMARY */
  // Begin ControlValueAccesor methods.
  onChange = _ => {};
  onTouched = () => {};

  // Form model content changed.
  writeValue(content: any): void {
    this.model = content;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}

