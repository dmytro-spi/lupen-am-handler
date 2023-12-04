import { v4 as uuidv4 } from 'uuid';
import { ComplexDataType, DataSchema, SimpleDataType } from "../../dataSchema/types/dataSchema";
import { Action } from '../types/action';
import { categories } from '../categories';

export const actionArguments: DataSchema = {
  type: ComplexDataType.Object,
  properties: {
    strings: {
      type: ComplexDataType.Array,
      description: 'An array of strings to be concatenated.',
      arrayType: {
        type: SimpleDataType.Text,
      },
      required: true,
    },
    divider: {
      type: SimpleDataType.Text,
      description:
        'The divider to be used between strings. Default is a space.',
      defaultValue: ' ',
    },
  },
};

export const description = `
Concatenates an array of strings into a single string.
`;

export const implementation = `
const concat = (strings, divider = ' ') => {
  const validate = ajv.compile($actionArguments$);
  const valid = validate({ strings, divider });

  if (!valid) {
    throw new Error(\`Invalid arguments for action $actionName$: \${ajv.errorsText(validate.errors)}\`);
  }

  return strings.join(divider);
}
`;

export const functionCall = `
const $variable$ = concat($strings$, $divider$);
`;

export const actionOutput: DataSchema = {
  type: SimpleDataType.Text,
};

export const combineAction: Action = {
  id: uuidv4(),
  category: categories.find((category) => category.name === 'string')?.id || '',
  name: 'combine',
  label: 'Combine',
  arguments: JSON.stringify(actionArguments),
  description: description.trim(),
  implementation: implementation.trim(),
  functionCall: functionCall.trim(),
  output: JSON.stringify(actionOutput),
};
