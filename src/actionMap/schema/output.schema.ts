import * as yup from 'yup';
import { OutputDirection, OutputType } from '../types/actionMap';

// OutputDirection schema
const outputDirectionSchema = yup
  .mixed<OutputDirection>()
  .oneOf(Object.values(OutputDirection));

// OutputType schema
const outputTypeSchema = yup
  .mixed<OutputType>()
  .oneOf(Object.values(OutputType));

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
    type: yup.mixed().oneOf([OutputType.Default]),
  }));

// ConditionalOutput schema
const conditionalOutputSchema = outputGeneralSchema
  .concat(yup.object({
    type: yup.mixed().oneOf([OutputType.Conditional]),
    condition: yup.string().required(),
  }));

// ForEachOutput schema
const forEachOutputSchema = outputGeneralSchema
  .concat(yup.object({
    type: yup.mixed().oneOf([OutputType.ForEach]),
  }));

// Combined Output schema
const outputSchema = yup.lazy(value => {
  switch (value.type) {
    case OutputType.Default:
      return defaultOutputSchema;
    case OutputType.Conditional:
      return conditionalOutputSchema;
    case OutputType.ForEach:
      return forEachOutputSchema;
    default:
      return yup.object().shape({});
  }
});

export default outputSchema;
