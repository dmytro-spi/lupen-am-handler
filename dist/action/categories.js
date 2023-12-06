"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categories = void 0;
const uuid_1 = require("uuid");
exports.categories = [
    {
        id: (0, uuid_1.v4)(),
        name: 'string',
        label: 'String',
    },
    {
        id: (0, uuid_1.v4)(),
        name: 'array',
        label: 'Array',
    },
    {
        id: (0, uuid_1.v4)(),
        name: 'object',
        label: 'Object',
    },
    {
        id: (0, uuid_1.v4)(),
        name: 'math',
        label: 'Math',
    },
    {
        id: (0, uuid_1.v4)(),
        name: 'date',
        label: 'Date',
    },
    {
        id: (0, uuid_1.v4)(),
        name: 'url',
        label: 'URL',
    },
    {
        id: (0, uuid_1.v4)(),
        name: 'json',
        label: 'JSON',
    },
    {
        id: (0, uuid_1.v4)(),
        name: 'utility',
        label: 'Utility',
    },
];
