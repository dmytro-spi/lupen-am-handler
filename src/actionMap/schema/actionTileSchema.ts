import { JSONSchema7 } from 'jsonschema7';

export const actionTileSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    coordinates: {
      type: 'object',
      properties: {
        start: {
          type: 'array',
          items: {
            type: 'number',
          },
          minItems: 2,
          maxItems: 2,
        },
        end: {
          type: 'array',
          items: {
            type: 'number',
          },
          minItems: 2,
          maxItems: 2,
        },
      },
      required: ['start', 'end'],
    },
    type: {
      type: 'string',
      const: 'action',
    },
    output: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    actionId: {
      type: 'string',
    },
    input: {
      type: 'object',
      additionalProperties: {
        type: 'string',
      },
    },
    options: {
      type: 'object',
      additionalProperties: true,
    },
  },
  required: ['id', 'coordinates', 'type', 'output', 'actionId', 'input'],
};

export const actionTileSchemaJson = JSON.stringify(actionTileSchema);
