import { JSONSchema7 } from 'jsonschema7';

export const actionMapSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    dataIn: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          label: {
            type: 'string',
          },
          type: {
            type: 'string',
          },
          required: {
            type: 'boolean',
          },
        },
        required: ['name', 'label', 'type', 'required'],
      },
    },
    outputs: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          direction: {
            type: 'string',
            enum: ['down', 'right', 'up', 'left'],
          },
          coordinates: {
            type: 'array',
            items: {
              type: 'number',
            },
            minItems: 2,
            maxItems: 2,
          },
          argument: {
            type: 'string',
          },
          arrayIndex: {
            type: 'number',
          },
          type: {
            type: 'string',
            enum: ['default', 'conditional', 'forEach'],
          },
          condition: {
            type: 'string',
          },
        },
        required: ['id', 'direction', 'coordinates', 'type'],
      },
    },
    tiles: {
      type: 'array',
      items: {
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
          },
          type: {
            type: 'string',
            enum: ['accessor', 'action', 'memory'],
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
          isDataOut: {
            type: 'boolean',
          },
        },
      },
    },
  },
  required: ['id', 'name', 'dataIn', 'outputs', 'tiles'],
};

export const actionMapSchemaJson = JSON.stringify(actionMapSchema);
