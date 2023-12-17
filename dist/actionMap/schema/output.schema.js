"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
const actionMap_1 = require("../types/actionMap");
// OutputDirection schema
const outputDirectionSchema = yup
    .mixed()
    .oneOf(Object.values(actionMap_1.OutputDirection));
// OutputType schema
const outputTypeSchema = yup
    .mixed()
    .oneOf(Object.values(actionMap_1.OutputType));
// Base OutputGeneral schema
const outputGeneralSchema = yup.object().shape({
    id: yup.string().required(),
    direction: outputDirectionSchema.required(),
    coordinates: yup
        .array()
        .of(yup.number())
        .min(2)
        .max(2)
        .required(),
    toArgument: yup.string().nullable(),
    type: outputTypeSchema.required(),
    outputPath: yup.string().nullable(),
});
// DefaultOutput schema
const defaultOutputSchema = outputGeneralSchema
    .concat(yup.object({
    type: yup.mixed().oneOf([actionMap_1.OutputType.Default]),
}));
// ConditionalOutput schema
const conditionalOutputSchema = outputGeneralSchema
    .concat(yup.object({
    type: yup.mixed().oneOf([actionMap_1.OutputType.Conditional]),
    condition: yup.string().required(),
}));
// ForEachOutput schema
const forEachOutputSchema = outputGeneralSchema
    .concat(yup.object({
    type: yup.mixed().oneOf([actionMap_1.OutputType.ForEach]),
}));
// Combined Output schema
const outputSchema = yup.lazy(value => {
    switch (value.type) {
        case actionMap_1.OutputType.Default:
            return defaultOutputSchema;
        case actionMap_1.OutputType.Conditional:
            return conditionalOutputSchema;
        case actionMap_1.OutputType.ForEach:
            return forEachOutputSchema;
        default:
            return yup.object().shape({});
    }
});
exports.default = outputSchema;
