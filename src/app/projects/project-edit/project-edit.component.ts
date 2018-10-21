import {
  Component,
  OnInit
} from '@angular/core';
import {Project} from '../models/project.model';
import {
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

import {
  ScrollToService,
  ScrollToConfigOptions,
} from '@nicky-lenaers/ngx-scroll-to';
import { forwardRef } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProjectEditComponent),
      multi: true
    }
  ]
})
export class ProjectEditComponent implements OnInit, ControlValueAccessor {
  public options: Object = {
    charCounterCount: true, /** CHARACTER COUNT FOR SUMMARY */
    toolbarButtons: [
      'bold',
      'italic',
      'underline',
      'fontSize',
      'color'
      // ['accept', 'accept-charset', 'accesskey', 'action', 'align', 'allowfullscreen', 'allowtransparency', 'alt', 'async', 'autocomplete', 'autofocus', 'autoplay', 'autosave', 'background', 'bgcolor', 'border', 'charset', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'color', 'cols', 'colspan', 'content', 'contenteditable', 'contextmenu', 'controls', 'coords', 'data', 'data-.*', 'datetime', 'default', 'defer', 'dir', 'dirname', 'disabled', 'download', 'draggable', 'dropzone', 'enctype', 'for', 'form', 'formaction', 'frameborder', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'http-equiv', 'icon', 'id', 'ismap', 'itemprop', 'keytype', 'kind', 'label', 'lang', 'language', 'list', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'mozallowfullscreen', 'multiple', 'muted', 'name', 'novalidate', 'open', 'optimum', 'pattern', 'ping', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'reversed', 'rows', 'rowspan', 'sandbox', 'scope', 'scoped', 'scrolling', 'seamless', 'selected', 'shape', 'size', 'sizes', 'span', 'src', 'srcdoc', 'srclang', 'srcset', 'start', 'step', 'summary', 'spellcheck', 'style', 'tabindex', 'target', 'title', 'type', 'translate', 'usemap', 'value', 'valign', 'webkitallowfullscreen', 'width', 'wrap']
    ],
    toolbarButtonsXS: [
      'bold',
      'italic',
      'underline',
      'fontSize',
      'color'
    ],
    toolbarButtonsSM: [
      'bold',
      'italic',
      'underline',
      'fontSize',
      'color'
    ],
    toolbarButtonsMD: [
      'bold',
      'italic',
      'underline',
      'fontSize',
      'color'
    ],
  };
  id: number;
  editMode = false;
  editedItem: Project;
  projectForm: FormGroup;
  model: any; /** CONTENT OF RICH TEXT EDITOR OF SUMMARY */
  config: Object = {
    charCounterCount: false
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromProject.FeatureState>,
    private _scrollToService: ScrollToService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      // If there is an ID passed into url, then editMode is true, otherwise it is false
      this.editMode = params['id'] != null;
      this.initForm();
    });
    this.model = this.projectForm.controls.summary.value;
    console.log('model');
    console.log(this.model);



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

  /** ADDING MAIN BULLETS */
  onAddNewKeyMilestone() {
    (<FormArray>this.projectForm.get('keyMilestones')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        items: new FormArray([]),
      })
    );
    const length = (<FormArray>this.projectForm.get('keyMilestones')).length;
    const indexOfLastItem = length - 1;
    const destination = 'keyMilestone-' + indexOfLastItem;
    const config: ScrollToConfigOptions = {
      container: 'keyMilestones',
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
    const control = <FormArray>this.projectForm.controls['keyMilestones'];
    control.removeAt(i);
  }

  onDeleteUpcomingKeyActivity(indexOfUpcomingKeyActivity: number) {
    const control = <FormArray>(
      this.projectForm.controls['upcomingKeyActivities']
    );
    control.removeAt(indexOfUpcomingKeyActivity);
  }

  onDeleteResourceAssignment(indexOfResourceAssignment: number) {
    const control = <FormArray>this.projectForm.controls['resourceAssignments'];
    control.removeAt(indexOfResourceAssignment);
  }

  onDeleteKeyRisk(indexOfKeyRisk: number) {
    const control = <FormArray>this.projectForm.controls['keyRisks'];
    control.removeAt(indexOfKeyRisk);
  }

  onDeleteRequiredDecision(indexOfRequiredDecision: number) {
    const control = <FormArray>this.projectForm.controls['requiredDecisions'];
    control.removeAt(indexOfRequiredDecision);
  }

  /** DELETE ITEMS */
  onDeleteKeyMilestoneItem(keyMilestone, j: number) {
    const control = <FormArray>keyMilestone.controls.items;
    control.removeAt(j);
  }

  onDeleteUpcomingKeyActivityItem(
    upcomingKeyActivity,
    indexOfUpcomingKeyActivityItem
  ) {
    const control = <FormArray>upcomingKeyActivity.controls.items;
    control.removeAt(indexOfUpcomingKeyActivityItem);
  }

  onDeleteResourceAssignmentItem(
    resourceAssignment,
    indexOfResourceAssignmentItem
  ) {
    const control = <FormArray>resourceAssignment.controls.items;
    control.removeAt(indexOfResourceAssignmentItem);
  }

  onDeleteKeyRiskItem(keyRisk, indexOfKeyRiskItem) {
    const control = <FormArray>keyRisk.controls.items;
    control.removeAt(indexOfKeyRiskItem);
  }

  onDeleteRequiredDecisionItem(requiredDecision, indexOfRequiredDecisionItem) {
    const control = <FormArray>requiredDecision.controls.items;
    control.removeAt(indexOfRequiredDecisionItem);
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

          if (project['resourceAssignments']) {
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

          if (project['keyRisks']) {
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

          if (project['requiredDecisions']) {
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
        }); // end store subscribe
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
    onChange = (_) => {};
    onTouched = () => {};

    // Form model content changed.
    writeValue(content: any): void {
      this.model = content;
    }

    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }

}
