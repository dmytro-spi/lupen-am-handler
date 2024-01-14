export enum SimpleDataType {
    Text = "text",
    Number = "number",
    Date = "date",
    YesNo = "yesNo"
}
export enum FormatDataType {
    Money = "money",
    PhoneNumber = "phoneNumber",
    Email = "email",
    Url = "url"
}
export enum ContentDataType {
    Image = "image",
    Video = "video",
    Audio = "audio",
    File = "file"
}
export enum ComplexDataType {
    Object = "object",
    Array = "array"
}
export type DataTypes = SimpleDataType | ComplexDataType | FormatDataType | ContentDataType;
export type DataSchema = {
    type: DataTypes | DataTypes[];
    properties?: {
        [key: string]: DataSchema;
    };
    arrayType?: DataSchema;
    description?: string;
    defaultValue?: any;
    required?: boolean;
};
export interface Model {
    id: string;
    name: string;
    schema: string;
}
export const userModel: Model;
export const MEMORY_SELECTOR: (id: string) => string;
export const CONSTANT_SELECTOR: (name: string) => string;
export const MODEL_SELECTOR: (name: string) => string;
export const OUTPUT_SELECTOR: (id: string) => string;
export enum ConditionOperator {
    Equal = "==",
    StrongEqual = "===",
    NotEqual = "!=",
    StrongNotEqual = "!==",
    GreaterThan = ">",
    GreaterThanOrEqual = ">=",
    LessThan = "<",
    LessThanOrEqual = "<="
}
export enum OutputDirection {
    Down = "down",
    Right = "right",
    Up = "up",
    Left = "left"
}
export enum OutputType {
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
export enum TileType {
    Accessor = "accessor",
    Action = "action",
    Memory = "memory"
}
type TileGeneral = {
    id: string;
    coordinates: {
        start: [number, number];
        end: [number, number];
    };
    type: TileType;
};
export enum AccessorType {
    Model = "model",
    Constant = "constant",
    Memory = "memory",
    DataIn = "dataIn"
}
export type AccessorTile = TileGeneral & {
    output: Output['id'][];
    accessType: AccessorType;
};
type ConstantAccessorTile = AccessorTile & {
    accessType: AccessorType.Constant;
    constantName: string;
};
type DataInAccessorTile = AccessorTile & {
    accessType: AccessorType.DataIn;
    dataInProps: DataIn;
};
type MemoryAccessorTile = AccessorTile & {
    accessType: AccessorType.Memory;
    memoryTileId: string;
};
enum ModelAccessOperation {
    FindOne = "findOne",
    FindMany = "findMany",
    FindFirst = "findFirst",
    FindLast = "findLast"
}
type ModelAccessorTile = AccessorTile & {
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
export enum MemoryType {
    DataOut = "dataOut",
    Internal = "internal",
    Model = "model"
}
export type MemoryTile = TileGeneral & {
    input: Output['id'][];
    memoryType: MemoryType;
};
enum ModelMemoryOperation {
    Create = "create",
    Update = "update",
    Delete = "delete"
}
type ModelMemoryTile = MemoryTile & {
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
interface Category {
    id: string;
    name: string;
    label: string;
}
interface Action {
    id: string;
    category: Category['id'];
    name: string;
    label: string;
    arguments: string;
    description: string;
    implementation: string;
    functionCall: string;
    output: string;
}
type PropertyItem = {
    name: string;
    type: DataTypes | DataTypes[];
    children?: PropertyItem[];
};
type PropertyTree = PropertyItem[];
export type CompatiblePaths = {
    from: string;
    to: string;
}[];
export class DataSchemaHandler {
    getPropertiesTree(schema: DataSchema): PropertyTree;
    isSchemasCompatible(schema: DataSchema, schemaToCompare: DataSchema): boolean;
    isSchemaPartiallyCompatible(schemaFrom: DataSchema, schemaTo: DataSchema, cb: (compatiblePaths: string[]) => any): boolean;
    isSchemaPartiallyCompatibleWithTopLevelProperties(schemaFrom: DataSchema, schemaTo: DataSchema, cb: (compatiblePaths: CompatiblePaths) => any): boolean;
    validateSchema(schema: DataSchema): boolean;
    walkThroughPropertiesRecursive(schema: DataSchema, callback: (partialSchema: DataSchema, path: string) => void): void;
    getSchemaFromPath(schema: DataSchema, path: string): DataSchema;
}
export type PossibleOutput = {
    coordinates: [number, number];
    direction: OutputDirection;
    active: boolean;
};
export class ActionMapHandler {
    protected readonly models: Model[];
    protected readonly actionFetcher: (actionId: string) => Promise<Action | undefined>;
    protected readonly dataSchemaHandler: DataSchemaHandler;
    protected actionMap: ActionMap;
    protected changeStack: ActionMap[];
    protected futureStack: ActionMap[];
    constructor(actionMap: ActionMap | null, models: Model[], actionFetcher: (actionId: string) => Promise<Action | undefined>, options?: {
        skipValidation?: boolean;
    });
    get currentActionMap(): ActionMap;
    static get emptyActionMap(): ActionMap;
    createEmptyActionMap(name?: string): ActionMap;
    renameActionMap(name: string): ActionMap;
    validateSchema(): Promise<boolean>;
    getAccessorOutputSchema(tile: AccessorTile): Promise<DataSchema>;
    validateTile(tile: Tile): Promise<boolean>;
    addTile(tile: Tile): ActionMap;
    removeTile(id: string): ActionMap;
    canConnectTiles(fromTileId: string, toTileId: string, cb: (compatiblePaths: CompatiblePaths) => void): Promise<boolean>;
    addOutput(output: Omit<Output, 'id'>, fromTileId: string, toTileId: string): Promise<ActionMap>;
    removeOutput(id: string): ActionMap;
    updateTileCoordinates(id: string, start: [number, number], end: [number, number]): ActionMap;
    updateCoordinatesForTilesAndOutputs(tile: Tile, start: [number, number], end: [number, number]): void;
    tilesIntersect(start: [number, number], end: [number, number]): boolean;
    getTileOutputSchema(tile: Tile): Promise<DataSchema>;
    getActionArgumentsSchema(actionId: string): Promise<DataSchema>;
    getTilePossibleOutputs(tile: Tile): Promise<PossibleOutput[]>;
    undo(): ActionMap;
    redo(): ActionMap;
    protected pushNewState(actionMap: ActionMap): ActionMap;
    protected returnToPreviousState(): ActionMap;
    protected putCurrentToFutureState(): ActionMap;
    protected putCurrentToPreviousState(): ActionMap;
    protected clearFutureStack(): ActionMap;
    protected returnToFutureState(): ActionMap;
    protected getOutputDirection(tile: Tile, neighbor: Tile): OutputDirection;
    protected getOutputCoordinates(tile: Tile, neighbor: Tile, direction: OutputDirection): [number, number];
    protected getTileNeighbors(tile: Tile): Tile[];
    protected getActionOutputSchema(actionId: string): Promise<DataSchema>;
    protected getModelSchema(modelName: string): DataSchema;
    protected getMemoryById(id: string): MemoryTile | null;
    protected getMemorySchema(id: string): Promise<DataSchema>;
    protected processOutputs(inOutputs: Output[]): Promise<{
        argument?: string;
        schema: DataSchema;
    }[]>;
    protected getOutputById(id: string): Output;
    protected getOutputsByIds(ids: string[]): Output[];
    protected getSourceTileForOutput(outputId: string): Tile;
    protected checkIfTileHasIntersections(tile: Tile): boolean;
}

//# sourceMappingURL=types.d.ts.map
