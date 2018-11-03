import { ResourceAssignmentItem } from './resource-assignment-item.model';

export interface ResourceAssignment {
  id?: string;
  name?: string;
  items?: ResourceAssignmentItem[];
}
