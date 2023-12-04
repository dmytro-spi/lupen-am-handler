import { v4 as uuidv4 } from 'uuid';
import { Category } from './types/category';

export const categories: Category[] = [
  {
    id: uuidv4(),
    name: 'string',
    label: 'String',
  },
  {
    id: uuidv4(),
    name: 'array',
    label: 'Array',
  },
  {
    id: uuidv4(),
    name: 'object',
    label: 'Object',
  },
  {
    id: uuidv4(),
    name: 'math',
    label: 'Math',
  },
  {
    id: uuidv4(),
    name: 'date',
    label: 'Date',
  },
  {
    id: uuidv4(),
    name: 'url',
    label: 'URL',
  },
  {
    id: uuidv4(),
    name: 'json',
    label: 'JSON',
  },
  {
    id: uuidv4(),
    name: 'utility',
    label: 'Utility',
  },
];
