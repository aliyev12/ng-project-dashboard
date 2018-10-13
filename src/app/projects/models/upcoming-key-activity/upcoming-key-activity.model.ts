import {UpcomingKeyActivityItem} from '../upcoming-key-activity/upcoming-key-activity-item.model';

export class UpcomingKeyActivity {
  constructor(
    public name: string,
    public items: UpcomingKeyActivityItem[]) {}
}
