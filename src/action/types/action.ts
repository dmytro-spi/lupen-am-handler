import { Category } from './category';

export interface Action {
  id: string;
  category: Category['id'];
  name: string;
  label: string;
  arguments: string;
  description: string;
  implementation: string;
  functionCall: string;
  output: string;
}
