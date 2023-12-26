"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
const dataSchema_1 = require("../types/dataSchema");
const simpleDataTypeSchema = yup.mixed().oneOf(Object.values(dataSchema_1.SimpleDataType));
const formatDataTypeSchema = yup.mixed().oneOf(Object.values(dataSchema_1.FormatDataType));
const contentDataTypeSchema = yup.mixed().oneOf(Object.values(dataSchema_1.ContentDataType));
const complexDataTypeSchema = yup.mixed().oneOf(Object.values(dataSchema_1.ComplexDataType));
const dataTypesSchema = yup.lazy(value => yup.array().of(yup.mixed().oneOf([
    simpleDataTypeSchema,
    formatDataTypeSchema,
    contentDataTypeSchema,
    complexDataTypeSchema
])).required());
const dataSchema = yup.object({
    type: dataTypesSchema,
    properties: yup.lazy((value) => yup.object().shape(Object.keys(value).reduce((shape, key) => {
        shape[key] = dataSchema;
        return shape;
    }, {})).nullable()),
    arrayType: yup.lazy(() => dataSchema.nullable()),
    description: yup.string().nullable(),
    defaultValue: yup.mixed().nullable(),
    required: yup.boolean().nullable(),
});
exports.default = dataSchema;
