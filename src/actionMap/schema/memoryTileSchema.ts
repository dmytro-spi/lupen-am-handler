import { JSONSchema7 } from 'jsonschema7';

export const memoryTileSchema: JSONSchema7 = {
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
      const: 'memory',
    },
    input: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    isDataOut: {
      type: 'boolean',
    },
  },
  required: ['id', 'coordinates', 'type', 'input', 'isDataOut'],
};

export const memoryTileSchemaJson = JSON.stringify(memoryTileSchema);
