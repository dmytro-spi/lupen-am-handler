"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionTileSchemaJson = exports.actionTileSchema = void 0;
exports.actionTileSchema = {
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
exports.actionTileSchemaJson = JSON.stringify(exports.actionTileSchema);
