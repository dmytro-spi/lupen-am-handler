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
enum SpecialDataType {
    Any = "any"
}
export type DataTypes = SimpleDataType | ComplexDataType | FormatDataType | ContentDataType | SpecialDataType;
export type DataSchema = {
    type: DataTypes;
    properties?: {
        [key: string]: DataSchema;
    };
    arrayType?: DataSchema;
    description?: string;
    defaultValue?: any;
    required?: boolean;
};
enum CompatibilitySide {
    Source = "source",
    Target = "target"
}
enum SchemasCompatibilityTypes {
    Direct = "direct",
    Conditional = "conditional",
    ArrayItem = "arrayItem"
}
type Compatibility = {
    id: string;
    side: CompatibilitySide;
    type: SchemasCompatibilityTypes;
};
type DataSchemaWithCompatibility = DataSchema & {
    properties?: {
        [key: string]: DataSchemaWithCompatibility;
    };
    compatibility?: Compatibility[];
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
declare const combineAction: Action;
export interface Model {
    id: string;
    name: string;
    schema: string;
}
declare const userModel: Model;
enum SourceType {
    Constant = "constant",
    Memory = "memory",
    Model = "model",
    Input = "input"
}
type DataSource = {
    type: SourceType;
    name: string;
};
export enum ConditionOperator {
    Equal = "==",
    StrongEqual = "===",
    NotEqual = "!=",
    StrongNotEqual = "!==",
    GreaterThan = ">",
    GreaterThanOrEqual = ">=",
    LessThan = "<",
    LessThanOrEqual = "<=",
    Not = "!"
}
type Condition = {
    operator: ConditionOperator;
    leftValue: DataSource | Condition;
    rightValue?: DataSource | Condition;
};
export enum OutputType {
    Default = "default",
    Conditional = "conditional",
    ForEach = "forEach"
}
type OutputCompatiblePaths = {
    from: DataSchemaWithCompatibility;
    to: DataSchemaWithCompatibility;
};
type ConnectionDataMap = {
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
export enum TileType {
    Accessor = "accessor",
    Action = "action",
    Memory = "memory"
}
type TileGeneral = {
    id: string;
    coordinates: [number, number];
    type: TileType;
};
export enum AccessorType {
    Model = "model",
    Constant = "constant",
    Memory = "memory",
    DataIn = "dataIn"
}
export type AccessorTile = TileGeneral & {
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
export enum ModelAccessOperation {
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
    actionId: string;
};
export enum MemoryType {
    DataOut = "dataOut",
    Internal = "internal",
    Model = "model"
}
export type MemoryTile = TileGeneral & {
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
type ActionDataSchema = {
    actionId: string;
    arguments: DataSchema;
    output: DataSchema;
};
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
export class DataSchemaHandler {
    isSchemasCompatible(schema: DataSchema, schemaToCompare: DataSchema): boolean;
    findCompatibilities(source: DataSchema, target: DataSchema, cb: (source: DataSchemaWithCompatibility, target: DataSchemaWithCompatibility) => void): boolean;
    validateSchema(schema: DataSchema): boolean;
    walkThroughPropertiesRecursive(schema: DataSchema, callback: (partialSchema: DataSchema) => void): void;
    getSchemaFromPath(schema: DataSchema, path: string): DataSchema;
}
export class ActionMapHandler {
    protected readonly models: Model[];
    protected readonly dataSchemaHandler: DataSchemaHandler;
    protected actionMap: ActionMap;
    protected usedActions: ActionDataSchema[];
    protected undoStack: Uint8Array[];
    protected redoStack: Uint8Array[];
    constructor(actionMap: ActionMap | null, models: Model[], options?: {
        skipValidation?: boolean;
    });
    get currentActionMap(): ActionMap;
    static get emptyActionMap(): ActionMap;
    forceUpdateActionMap(actionMap: ActionMap): ActionMap;
    isTileNeedsForInputs(tileId: string): boolean;
    createEmptyActionMap(name?: string): ActionMap;
    renameActionMap(name: string): ActionMap;
    validateSchema(): {
        isValid: boolean;
        errors: any[];
    };
    getAccessorOutputSchema(tile: AccessorTile): DataSchema;
    validateTile(tile: Tile): boolean;
    addTile(tile: Tile, actionSchemas?: ActionDataSchema): ActionMap;
    removeTile(id: string): ActionMap;
    canConnectTiles(fromTileId: string, toTileId: string, cb: (compatiblePaths: OutputCompatiblePaths) => void): boolean;
    addOutput(output: Omit<Output, 'id'>): ActionMap;
    updateTileCoordinates(id: string, position: [number, number]): ActionMap;
    tilesIntersect(position: [number, number]): boolean;
    getTileOutputSchema(tile: Tile): DataSchema;
    getActionArgumentsSchema(actionId: string): DataSchema;
    undo(): ActionMap;
    redo(): ActionMap;
    getTileOutputs(tileId: string): Output[];
    getTileInputs(tileId: string): Output[];
    protected getMemoryInitialSchema(tileId: string): DataSchema;
    protected saveUndo(): void;
    protected undoChanges(): ActionMap;
    protected redoChanges(): ActionMap;
    protected getActionOutputSchema(actionId: string): DataSchema;
    protected getModelSchema(modelName: string): DataSchema;
    protected getMemoryById(id: string): MemoryTile | null;
    protected getMemorySchema(id: string): DataSchema;
    protected outputsToDataSchema(inOutputs: Output[]): DataSchema;
    protected getOutputById(id: string): Output;
    protected getOutputsByIds(ids: string[]): Output[];
    protected getOutputsByOutputTileId(id: string): Output[];
    protected getSourceTileForOutput(outputId: string): Tile;
}

//# sourceMappingURL=types.d.ts.map
