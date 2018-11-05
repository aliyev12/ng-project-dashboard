export interface Project {
  id?: string;
  archived?: boolean;
  name?: string;
  summary?: string;
  keyMilestones?: [
    {
      id?: string;
      name?: string;
      status?: number;
      date?: string;
      items?: [
        {
          id?: string,
          name?: string,
          status?: number,
          date?: string
        }
      ]
    }
  ];
  upcomingKeyActivities?: [
    {
      id?: string;
      name?: string;
      items?: [
        {
          id?: string,
          name?: string
        }
      ]
    }
  ];
  resourceAssignments?: [
    {
      id?: string;
      name?: string;
      items?: [
        {
          id?: string,
          name?: string
        }
      ]
    }
  ];
  keyRisks?: [
    {
      id?: string;
      name?: string;
      items?: [
        {
          id?: string,
          name?: string
        }
      ]
    }
  ];
  requiredDecisions?: [
    {
      id?: string;
      name?: string;
      items?: [
        {
          id?: string,
          name?: string
        }
      ]
    }
  ];
}


// export interface Project {
//   id?: string;
//   name?: string;
//   summary?: string;
//   keyMilestones?: KeyMilestone[];
//   upcomingKeyActivities?: UpcomingKeyActivity[];
//   resourceAssignments?: ResourceAssignment[];
//   keyRisks?: KeyRisk[];
//   requiredDecisions?: RequiredDecision[];
// }















// export class Project {
//   public name: string;
//   public summary: string;
//   // public lastModified: Date;
//   public keyMilestones: KeyMilestone[];
//   public upcomingKeyActivities: UpcomingKeyActivity[];
//   public resourceAssignments: ResourceAssignment[];
//   public keyRisks: KeyRisk[];
//   public requiredDecisions: RequiredDecision[];

//   constructor(
//     name: string,
//     summary: string,
//     // lastModified: Date,
//     keyMilestones: KeyMilestone[],
//     upcomingKeyActivities: UpcomingKeyActivity[],
//     resourceAssignments: ResourceAssignment[],
//     keyRisks: KeyRisk[],
//     requiredDecisions: RequiredDecision[]
//   ) {
//     this.name = name;
//     this.summary = summary;
//     // this.lastModified = lastModified;
//     this.keyMilestones = keyMilestones;
//     this.upcomingKeyActivities = upcomingKeyActivities;
//     this.resourceAssignments = resourceAssignments;
//     this.keyRisks = keyRisks;
//     this.requiredDecisions = requiredDecisions;
//   }
// }


