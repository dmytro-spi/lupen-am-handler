"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
const dataSchema_1 = require("../types/dataSchema");
// SimpleDataType, FormatDataType, ContentDataType, ComplexDataType enums
const simpleDataTypeSchema = yup.mixed().oneOf(Object.values(dataSchema_1.SimpleDataType));
const formatDataTypeSchema = yup.mixed().oneOf(Object.values(dataSchema_1.FormatDataType));
const contentDataTypeSchema = yup.mixed().oneOf(Object.values(dataSchema_1.ContentDataType));
const complexDataTypeSchema = yup.mixed().oneOf(Object.values(dataSchema_1.ComplexDataType));
// DataTypes schema
const dataTypesSchema = yup.lazy(value => yup.array().of(yup.mixed().oneOf([
    simpleDataTypeSchema,
    formatDataTypeSchema,
    contentDataTypeSchema,
    complexDataTypeSchema
])).required());
// Recursive DataSchema schema
const dataSchema = yup.object({
    type: dataTypesSchema,
    properties: yup.lazy(() => yup.object().shape({
    // This recursively references dataSchema for each property
    }).nullable()),
    arrayType: yup.lazy(() => dataSchema.nullable()),
    description: yup.string().nullable(),
    defaultValue: yup.mixed().nullable(),
    required: yup.boolean().nullable(),
});
// If needed to validate the properties object with dynamic keys
// dataSchema.fields.properties = dataSchema.fields.properties.of(
//   yup.object().shape({
//     // keys are dynamic, values are DataSchema
//   }).test('is-data-schema', '${path} must be a valid DataSchema', value => dataSchema.isValidSync(value))
// );
exports.default = dataSchema;
