import { RequiredDecisionItem } from './required-decision-item.model';

export class RequiredDecision {
  constructor(
    public name: string,
    public items: RequiredDecisionItem[]) {}
}
