import { DataSchema } from '../../dataSchema/types/dataSchema';
export declare const MEMORY_SELECTOR: (id: string) => string;
export declare const CONSTANT_SELECTOR: (name: string) => string;
export declare const MODEL_SELECTOR: (name: string) => string;
export declare const OUTPUT_SELECTOR: (id: string) => string;
export declare enum ConditionOperator {
    Equal = "==",
    StrongEqual = "===",
    NotEqual = "!=",
    StrongNotEqual = "!==",
    GreaterThan = ">",
    GreaterThanOrEqual = ">=",
    LessThan = "<",
    LessThanOrEqual = "<="
}
export declare enum OutputDirection {
    Down = "down",
    Right = "right",
    Up = "up",
    Left = "left"
}
export declare enum OutputType {
    Default = "default",
    Conditional = "conditional",
    ForEach = "forEach"
}
export type OutputGeneral = {
    id: string;
    direction: OutputDirection;
    coordinates: [number, number];
    toArgument?: string;
    type: OutputType;
    outputPath?: string;
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
export declare enum TileType {
    Accessor = "accessor",
    Action = "action",
    Memory = "memory"
}
export type TileGeneral = {
    id: string;
    coordinates: {
        start: [number, number];
        end: [number, number];
    };
    type: TileType;
};
export declare enum AccessorType {
    Model = "model",
    Constant = "constant",
    Memory = "memory",
    DataIn = "dataIn"
}
export type AccessorTile = TileGeneral & {
    output: Output['id'][];
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
export declare enum ModelAccessOperation {
    FindOne = "findOne",
    FindMany = "findMany",
    FindFirst = "findFirst",
    FindLast = "findLast"
}
export type ModelAccessorTile = AccessorTile & {
    accessType: AccessorType.Model;
    modelName: string;
    query: string;
    operation: ModelAccessOperation;
};
export type ActionTile = TileGeneral & {
    output: string[];
    actionId: string;
    input: Output['id'][];
};
export declare enum MemoryType {
    DataOut = "dataOut",
    Internal = "internal",
    Model = "model"
}
export type MemoryTile = TileGeneral & {
    input: Output['id'][];
    memoryType: MemoryType;
};
export declare enum ModelMemoryOperation {
    Create = "create",
    Update = "update",
    Delete = "delete"
}
export type ModelMemoryTile = MemoryTile & {
    memoryType: MemoryType.Model;
    modelName: string;
    query: string;
    operation: ModelMemoryOperation;
};
export type Tile = AccessorTile | ActionTile | MemoryTile | ModelMemoryTile | ModelAccessorTile | ConstantAccessorTile | DataInAccessorTile | MemoryAccessorTile;
export type DataIn = {
    name: string;
    label: string;
    type: DataSchema;
    required: boolean;
    defaultValue?: any;
};
export type ActionMap = {
    id: string;
    name: string;
    outputs: Output[];
    tiles: Tile[];
};
