import { KeyMilestone } from './key-milestone/key-milestone.model';
import { UpcomingKeyActivity } from './upcoming-key-activity/upcoming-key-activity.model';
import { ResourceAssignment } from './resource-assignment/resource-assignment.model';
import { KeyRisk } from './key-risk/key-risk.model';
import { RequiredDecision } from './required-decision/required-decision.model';

export class Project {
  public name: string;
  public summary: string;
  public keyMilestones: KeyMilestone[];
  public upcomingKeyActivities: UpcomingKeyActivity[];
  public resourceAssignments: ResourceAssignment[];
  public keyRisks: KeyRisk[];
  public requiredDecisions: RequiredDecision[];

  constructor(
    name: string,
    summary: string,
    keyMilestones: KeyMilestone[],
    upcomingKeyActivities: UpcomingKeyActivity[],
    resourceAssignments: ResourceAssignment[],
    keyRisks: KeyRisk[],
    requiredDecisions: RequiredDecision[]
  ) {
    this.name = name;
    this.summary = summary;
    this.keyMilestones = keyMilestones;
    this.upcomingKeyActivities = upcomingKeyActivities;
    this.resourceAssignments = resourceAssignments;
    this.keyRisks = keyRisks;
    this.requiredDecisions = requiredDecisions;
  }
}
