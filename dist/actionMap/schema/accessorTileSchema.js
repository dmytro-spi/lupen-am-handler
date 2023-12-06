"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessorTileSchemaJson = exports.accessorTileSchema = void 0;
exports.accessorTileSchema = {
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
exports.accessorTileSchemaJson = JSON.stringify(exports.accessorTileSchema);
