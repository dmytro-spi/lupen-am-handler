import { JSONSchema7 } from 'jsonschema7';

export const accessorTileSchema: JSONSchema7 = {
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
      const: 'accessor',
    },
    output: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    source: {
      type: 'string',
    },
  },
  required: ['id', 'coordinates', 'type', 'output', 'source'],
};

export const accessorTileSchemaJson = JSON.stringify(accessorTileSchema);
