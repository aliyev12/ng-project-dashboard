import { KeyRiskItem } from './key-risk-item.model';

export interface KeyRisk {
  id?: string;
  name?: string;
  items?: KeyRiskItem[];
}
