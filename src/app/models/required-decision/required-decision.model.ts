import { RequiredDecisionItem } from './required-decision-item.model';

export interface RequiredDecision {
  id?: string;
  name?: string;
  items?: RequiredDecisionItem[];
}
