import {UpcomingKeyActivityItem} from '../upcoming-key-activity/upcoming-key-activity-item.model';

export interface UpcomingKeyActivity {
  id?: string;
  name?: string;
  items?: UpcomingKeyActivityItem[];
}
