import { ResourceAssignmentItem } from './resource-assignment-item.model';

export class ResourceAssignment {
  constructor(
    public name: string,
    public items: ResourceAssignmentItem[]) {}
}
