import { IMyDateModel} from 'mydatepicker';

export interface Plotter {
  bullet?: number;
  kmIndex?: number;
  name?: string;
  date?: IMyDateModel;
  status?: number;
  position?: number;
  offset?: {
    'margin-left': string
    };
}


