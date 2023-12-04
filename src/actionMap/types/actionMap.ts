// User language types ---------------------------------------------------------
export const MEMORY_SELECTOR = (id: string) => `memory::${id}`;
export const CONSTANT_SELECTOR = (name: string) => `constant::${name}`;
export const MODEL_SELECTOR = (name: string) => `model::${name}`;
export const OUTPUT_SELECTOR = (id: string) => `output::${id}`;

// condition operators
export enum ConditionOperator {
  Equal = '==',
  StrongEqual = '===',
  NotEqual = '!=',
  StrongNotEqual = '!==',
  GreaterThan = '>',
  GreaterThanOrEqual = '>=',
  LessThan = '<',
  LessThanOrEqual = '<=',
}

// Output types ----------------------------------------------------------------
export enum OutputDirection {
  Down = 'down',
  Right = 'right',
  Up = 'up',
  Left = 'left',
}

export enum OutputType {
  Default = 'default',
  Conditional = 'conditional',
  ForEach = 'forEach',
}

export type OutputGeneral = {
  id: string;
  direction: OutputDirection;
  coordinates: [number, number];
  toArgument?: string;
  type: OutputType;
  outputPath?: string; // .field.nestedField
};

export type DefaultOutput = OutputGeneral & {
  type: OutputType.Default;
};

export type ConditionalOutput = OutputGeneral & {
  type: OutputType.Conditional;
  condition: string;
};

export type ForEachOutput = OutputGeneral & {
  type: OutputType.ForEach;
};

export type Output = DefaultOutput | ConditionalOutput | ForEachOutput;

// Tile types ------------------------------------------------------------------
export enum TileType {
  Accessor = 'accessor',
  Action = 'action',
  Memory = 'memory',
}

export enum AccessorSources {
  Model = 'model',
  Constant = 'constant',
  Memory = 'memory',
  Input = 'input',
}

type TileGeneral = {
  id: string;
  coordinates: { start: [number, number]; end: [number, number] };
  type: TileType;
};

export type AccessorTile = TileGeneral & {
  output: Output['id'][];
  source: string; // memory::id, or memory::id/field/nestedField, or constant::name, or model::name
};

export type ActionTile = TileGeneral & {
  output: string[];
  actionId: string;
  input: Output['id'][];
  // options?: {
  //   [key: string]: any; // memory::id, or constant::name, or any other value
  // };
};

export type MemoryTile = TileGeneral & {
  input: Output['id'][];
  isDataOut: boolean;
};

export type Tile = AccessorTile | ActionTile | MemoryTile;

// Data in types ---------------------------------------------------------------
export type DataIn = {
  name: string;
  label: string;
  type: string;
  required: boolean;
};

// Action map types ------------------------------------------------------------
export type ActionMap = {
  id: string;
  name: string;
  dataIn: DataIn[];
  outputs: Output[];
  tiles: Tile[];
};
