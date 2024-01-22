import * as yup from 'yup';
import { AccessorType, MemoryType, ModelAccessOperation, ModelMemoryOperation, TileType } from '../types/actionMap';
import dataSchemaSchema from '../../dataSchema/schema/dataSchema.schema';

export const dataInSchema = yup.object().shape({
  name: yup.string().required(),
  label: yup.string().required(),
  type: dataSchemaSchema.required(),
  required: yup.boolean().required(),
  defaultValue: yup.mixed().nullable(),
});

// TileType schema
export const tileTypeSchema = yup
  .mixed<TileType>()
  .oneOf(Object.values(TileType));

// AccessorType schema
export const accessorTypeSchema = yup
  .mixed<AccessorType>()
  .oneOf(Object.values(AccessorType));

// ModelAccessOperation schema
export const modelAccessOperationSchema = yup
  .mixed<ModelAccessOperation>()
  .oneOf(Object.values(ModelAccessOperation));

// ModelMemoryOperation schema
export const modelMemoryOperationSchema = yup
  .mixed<ModelMemoryOperation>()
  .oneOf(Object.values(ModelMemoryOperation));

// Base TileGeneral schema
export const tileGeneralSchema = yup.object().shape({
  id: yup.string().required(),
  coordinates: yup.array().of(yup.number()).min(2).max(2).required(),
  type: tileTypeSchema.required(),
});

// AccessorTile schema
export const accessorTileSchema = tileGeneralSchema
  .concat(yup.object({
    accessType: accessorTypeSchema.required(),
  }));

// ConstantAccessorTile schema
export const constantAccessorTileSchema = accessorTileSchema
  .concat(yup.object({
    accessType: yup.mixed().oneOf([AccessorType.Constant]),
    constantName: yup.string().required(),
  }));

// DataInAccessorTile schema
export const dataInAccessorTileSchema = accessorTileSchema
  .concat(yup.object({
    accessType: yup.mixed().oneOf([AccessorType.DataIn]),
    dataInProps: dataInSchema.required(),
  }));

// MemoryAccessorTile schema
export const memoryAccessorTileSchema = accessorTileSchema
  .concat(yup.object({
    accessType: yup.mixed().oneOf([AccessorType.Memory]),
    memoryTileId: yup.string().required(),
  }));

// ModelAccessorTile schema
export const modelAccessorTileSchema = accessorTileSchema
  .concat(yup.object({
    accessType: yup.mixed().oneOf([AccessorType.Model]),
    modelName: yup.string().required(),
    // query: yup.string().required(),
    operation: modelAccessOperationSchema.required(),
  }));

// ActionTile schema
export const actionTileSchema = tileGeneralSchema
  .concat(yup.object({
    output: yup.array().of(yup.string()).required(),
    actionId: yup.string().required(),
    input: yup.array().of(yup.string()).required(),
  }));

// MemoryTile schema
export const memoryTileSchema = tileGeneralSchema
  .concat(yup.object({
    memoryType: yup
      .mixed<MemoryType>()
      .oneOf(Object.values(MemoryType))
      .required(),
  }));

// ModelMemoryTile schema
export const modelMemoryTileSchema = memoryTileSchema
  .concat(yup.object({
    memoryType: yup.mixed().oneOf([MemoryType.Model]),
    modelName: yup.string().required(),
    // query: yup.string().required(),
    operation: modelMemoryOperationSchema.required(),
  }));

// Combined Tile schema
const tileSchema = yup.lazy(value => {
  switch (value.type) {
    case TileType.Accessor:
      switch (value.accessType) {
        case AccessorType.Constant:
          return constantAccessorTileSchema;
        case AccessorType.DataIn:
          return dataInAccessorTileSchema;
        case AccessorType.Memory:
          return memoryAccessorTileSchema;
        case AccessorType.Model:
          return modelAccessorTileSchema;
        default:
          return accessorTileSchema;
      }
    case TileType.Action:
      return actionTileSchema;
    case TileType.Memory:
      return (value.memoryType === MemoryType.Model) ? modelMemoryTileSchema : memoryTileSchema;
    default:
      return yup.object().shape({
        type: yup.mixed<TileType>().oneOf(Object.values(TileType)).required(),
      });
  }
});

export default tileSchema;
