import { KeyRiskItem } from './key-risk-item.model';

export class KeyRisk {
  constructor(
    public name: string,
    public items: KeyRiskItem[]) {}
}
