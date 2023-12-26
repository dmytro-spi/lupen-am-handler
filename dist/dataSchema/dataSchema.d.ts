import { DataSchema, DataTypes } from './types/dataSchema';
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
export declare class DataSchemaHandler {
    getPropertiesTree(schema: DataSchema): PropertyTree;
    isSchemasCompatible(schema: DataSchema, schemaToCompare: DataSchema): boolean;
    isSchemaPartiallyCompatible(schemaFrom: DataSchema, schemaTo: DataSchema, cb: (compatiblePaths: string[]) => any): boolean;
    isSchemaPartiallyCompatibleWithTopLevelProperties(schemaFrom: DataSchema, schemaTo: DataSchema, cb: (compatiblePaths: CompatiblePaths) => any): boolean;
    validateSchema(schema: DataSchema): boolean;
    walkThroughPropertiesRecursive(schema: DataSchema, callback: (partialSchema: DataSchema, path: string) => void): void;
    getSchemaFromPath(schema: DataSchema, path: string): DataSchema;
    private isSchemasCompatibleRecursive;
    private getPropertiesTreeFromSchema;
}
export {};
