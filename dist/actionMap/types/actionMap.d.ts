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
export declare enum AccessorSources {
    Model = "model",
    Constant = "constant",
    Memory = "memory",
    Input = "input"
}
type TileGeneral = {
    id: string;
    coordinates: {
        start: [number, number];
        end: [number, number];
    };
    type: TileType;
};
export type AccessorTile = TileGeneral & {
    output: Output['id'][];
    source: string;
};
export type ActionTile = TileGeneral & {
    output: string[];
    actionId: string;
    input: Output['id'][];
};
export type MemoryTile = TileGeneral & {
    input: Output['id'][];
    isDataOut: boolean;
};
export type Tile = AccessorTile | ActionTile | MemoryTile;
export type DataIn = {
    name: string;
    label: string;
    type: string;
    required: boolean;
};
export type ActionMap = {
    id: string;
    name: string;
    dataIn: DataIn[];
    outputs: Output[];
    tiles: Tile[];
};
export {};
