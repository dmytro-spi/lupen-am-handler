"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.userSchema = void 0;
const uuid_1 = require("uuid");
const dataSchema_1 = require("../../dataSchema/types/dataSchema");
exports.userSchema = {
    type: dataSchema_1.ComplexDataType.Object,
    properties: {
        email: {
            type: dataSchema_1.FormatDataType.Email,
        },
        firstName: {
            type: dataSchema_1.SimpleDataType.Text,
        },
        lastName: {
            type: dataSchema_1.SimpleDataType.Text,
        },
        dateOfBirth: {
            type: dataSchema_1.SimpleDataType.Date,
        },
    },
};
exports.userModel = {
    id: (0, uuid_1.v4)(),
    name: 'user',
    schema: JSON.stringify(exports.userSchema),
};
