import {KeyMilestoneItem} from './key-milestone-item.model';

export class KeyMilestone {
  constructor(
    public name: string,
    public items: KeyMilestoneItem[]
    ) {}
}
