"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineAction = exports.actionOutput = exports.functionCall = exports.implementation = exports.description = exports.actionArguments = void 0;
const uuid_1 = require("uuid");
const dataSchema_1 = require("../../dataSchema/types/dataSchema");
const categories_1 = require("../categories");
exports.actionArguments = {
    type: dataSchema_1.ComplexDataType.Object,
    properties: {
        strings: {
            type: dataSchema_1.ComplexDataType.Array,
            description: 'An array of strings to be concatenated.',
            arrayType: {
                type: dataSchema_1.SimpleDataType.Text,
            },
            required: true,
        },
        divider: {
            type: dataSchema_1.SimpleDataType.Text,
            description: 'The divider to be used between strings. Default is a space.',
            defaultValue: ' ',
        },
    },
};
exports.description = `
Concatenates an array of strings into a single string.
`;
exports.implementation = `
const concat = (strings, divider = ' ') => {
  const validate = ajv.compile($actionArguments$);
  const valid = validate({ strings, divider });

  if (!valid) {
    throw new Error(\`Invalid arguments for action $actionName$: \${ajv.errorsText(validate.errors)}\`);
  }

  return strings.join(divider);
}
`;
exports.functionCall = `
const $variable$ = concat($strings$, $divider$);
`;
exports.actionOutput = {
    type: dataSchema_1.SimpleDataType.Text,
};
exports.combineAction = {
    id: (0, uuid_1.v4)(),
    category: categories_1.categories.find((category) => category.name === 'string')?.id || '',
    name: 'combine',
    label: 'Combine',
    arguments: JSON.stringify(exports.actionArguments),
    description: exports.description.trim(),
    implementation: exports.implementation.trim(),
    functionCall: exports.functionCall.trim(),
    output: JSON.stringify(exports.actionOutput),
};
