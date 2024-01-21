import { DataSchema, DataSchemaWithCompatibility } from '../../dataSchema/types/dataSchema';

// Data access types -----------------------------------------------------------
export enum SourceType {
  Constant = 'constant',
  Memory = 'memory',
  Model = 'model',
  Input = 'input',
}

export type DataSource = {
  type: SourceType;
  name: string;
};

// Condition operators ---------------------------------------------------------
export enum ConditionOperator {
  Equal = '==',
  StrongEqual = '===',
  NotEqual = '!=',
  StrongNotEqual = '!==',
  GreaterThan = '>',
  GreaterThanOrEqual = '>=',
  LessThan = '<',
  LessThanOrEqual = '<=',
  Not = '!',
}

export enum LogicalOperator {
  And = '&&',
  Or = '||',
}

export type Condition = {
  operator: ConditionOperator;
  leftValue: DataSource | Condition;
  rightValue?: DataSource | Condition;
};

// Output types ----------------------------------------------------------------
export enum OutputType {
  Default = 'default',
  Conditional = 'conditional',
  ForEach = 'forEach',
}

export type OutputCompatiblePaths = {
  from: DataSchemaWithCompatibility;
  to: DataSchemaWithCompatibility;
};

export type ConnectionDataMap = {
  outputPath: string;
  inputPath: string;
};

export type OutputGeneral = {
  id: string;
  type: OutputType;
  outputTileId: Tile['id'];
  inputTileId: Tile['id'];
  dataMap: ConnectionDataMap[];
};

export type DefaultOutput = OutputGeneral & {
  type: OutputType.Default;
};

export type ConditionalOutput = OutputGeneral & {
  type: OutputType.Conditional;
  condition: Condition;
};

export type ForEachOutput = OutputGeneral & {
  type: OutputType.ForEach;
  forEachDataMap: ConnectionDataMap;
};

export type Output = DefaultOutput | ConditionalOutput | ForEachOutput;

// Tile types ------------------------------------------------------------------
export enum TileType {
  Accessor = 'accessor',
  Action = 'action',
  Memory = 'memory',
}

export type TileGeneral = {
  id: string;
  coordinates: [number, number];
  type: TileType;
};

export enum AccessorType {
  Model = 'model',
  Constant = 'constant',
  Memory = 'memory',
  DataIn = 'dataIn',
}

export type AccessorTile = TileGeneral & {
  accessType: AccessorType;
};

export type ConstantAccessorTile = AccessorTile & {
  accessType: AccessorType.Constant;
  constantName: string;
};

export type DataInAccessorTile = AccessorTile & {
  accessType: AccessorType.DataIn;
  dataInProps: DataIn;
};

export type MemoryAccessorTile = AccessorTile & {
  accessType: AccessorType.Memory;
  memoryTileId: string;
};

export enum  ModelAccessOperation {
  FindOne = 'findOne',
  FindMany = 'findMany',
  FindFirst = 'findFirst',
  FindLast = 'findLast',
};

export type ModelAccessorTile = AccessorTile & {
  accessType: AccessorType.Model;
  modelName: string;
  query: string;
  operation: ModelAccessOperation;
};

export type ActionTile = TileGeneral & {
  actionId: string;
};

export enum MemoryType { // TODO: reimplement data schema for this
  DataOut = 'dataOut',
  Internal = 'internal',
  Model = 'model',
}

export type MemoryTile = TileGeneral & {
  memoryType: MemoryType;
};

export enum ModelMemoryOperation {
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
};

export type ModelMemoryTile = MemoryTile & {
  memoryType: MemoryType.Model;
  modelName: string;
  query: string;
  operation: ModelMemoryOperation;
};

export type DataOutMemoryTile = MemoryTile & {
  memoryType: MemoryType.DataOut;
  memoryName: string;
  properties: string[];
};

export type InternalMemoryTile = MemoryTile & {
  memoryType: MemoryType.Internal;
  memoryName: string;
  properties: string[];
};

export type Tile = AccessorTile
| ActionTile
| MemoryTile
| ModelMemoryTile
| ModelAccessorTile
| ConstantAccessorTile
| DataInAccessorTile
| MemoryAccessorTile;

// Action data schemas ---------------------------------------------------------
export type ActionDataSchema = {
  actionId: string;
  arguments: DataSchema;
  output: DataSchema;
};

// Data in types ---------------------------------------------------------------
export type DataIn = {
  name: string;
  label: string;
  type: DataSchema;
  required: boolean;
  defaultValue?: any;
};

// Action map types ------------------------------------------------------------
export type ActionMap = {
  id: string;
  name: string;
  outputs: Output[];
  tiles: Tile[];
};
