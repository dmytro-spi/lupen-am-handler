"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSchemaHandler = void 0;
const dataSchema_1 = require("./types/dataSchema");
class DataSchemaHandler {
    getPropertiesTree(schema) {
        return this.getPropertiesTreeFromSchema(schema);
    }
    isSchemasCompatible(schema, schemaToCompare) {
        return this.isSchemasCompatibleRecursive(schema, schemaToCompare);
    }
    isSchemaPartiallyCompatible(schemaFrom, schemaTo, cb) {
        const compatiblePaths = [];
        this.walkThroughPropertiesRecursive(schemaFrom, (partialSchema, path) => {
            if (this.isSchemasCompatibleRecursive(partialSchema, schemaTo)) {
                compatiblePaths.push(path);
            }
        });
        cb(compatiblePaths);
        return compatiblePaths.length > 0;
    }
    isSchemaPartiallyCompatibleWithTopLevelProperties(schemaFrom, schemaTo, cb) {
        const compatiblePaths = [];
        Object.entries(schemaTo.properties || {}).forEach(([key, value]) => {
            this.walkThroughPropertiesRecursive(schemaFrom, (partialSchema, path) => {
                if (this.isSchemasCompatibleRecursive(partialSchema, value)) {
                    compatiblePaths.push({ from: path, to: `.${key}` });
                }
            });
        });
        cb(compatiblePaths);
        return compatiblePaths.length > 0;
    }
    validateSchema(schema) {
        if (schema.type !== dataSchema_1.ComplexDataType.Object && schema.properties) {
            return false;
        }
        return true;
    }
    walkThroughPropertiesRecursive(schema, callback) {
        switch (schema.type) {
            case dataSchema_1.SimpleDataType.Text:
            case dataSchema_1.SimpleDataType.Number:
            case dataSchema_1.SimpleDataType.Date:
            case dataSchema_1.SimpleDataType.YesNo:
            case dataSchema_1.ContentDataType.File:
            case dataSchema_1.ContentDataType.Image:
            case dataSchema_1.ContentDataType.Video:
            case dataSchema_1.ContentDataType.Audio:
                callback(schema, '');
                break;
            case dataSchema_1.ComplexDataType.Object:
                Object.entries(schema.properties || {}).forEach(([key, value]) => {
                    this.walkThroughPropertiesRecursive(value, (partialSchema, path) => {
                        callback(partialSchema, `.${key}${path}`);
                    });
                });
                break;
            case dataSchema_1.ComplexDataType.Array:
                this.walkThroughPropertiesRecursive(schema.arrayType, (dSchema, path) => {
                    callback(dSchema, `[]${path}`);
                });
                break;
            default:
                throw new Error(`Unsupported data type: ${schema.type}`);
        }
    }
    getSchemaFromPath(schema, path) {
        const pathParts = path.split(/\.|\[\]/g).filter((part) => part !== '');
        let currentSchema = schema;
        for (const pathPart of pathParts) {
            switch (currentSchema.type) {
                case dataSchema_1.ComplexDataType.Object:
                    currentSchema = currentSchema.properties[pathPart];
                    break;
                case dataSchema_1.ComplexDataType.Array:
                    currentSchema = currentSchema.arrayType;
                    break;
                default:
                    throw new Error(`Unsupported data type: ${currentSchema.type} at path: ${path}`);
            }
        }
        return currentSchema;
    }
    isSchemasCompatibleRecursive(schemaFrom, schemaTo) {
        if (schemaFrom.type !== schemaTo.type) {
            return false;
        }
        switch (schemaFrom.type) {
            case dataSchema_1.SimpleDataType.Text:
            case dataSchema_1.SimpleDataType.Number:
            case dataSchema_1.SimpleDataType.Date:
            case dataSchema_1.SimpleDataType.YesNo:
            case dataSchema_1.ContentDataType.File:
            case dataSchema_1.ContentDataType.Image:
            case dataSchema_1.ContentDataType.Video:
            case dataSchema_1.ContentDataType.Audio:
                return true;
            case dataSchema_1.ComplexDataType.Object:
                return Object.entries(schemaFrom.properties || {}).every(([key, value]) => {
                    const schemaToProperty = schemaTo.properties?.[key];
                    if (!schemaToProperty) {
                        return false;
                    }
                    return this.isSchemasCompatibleRecursive(value, schemaToProperty);
                });
            case dataSchema_1.ComplexDataType.Array:
                return this.isSchemasCompatibleRecursive(schemaFrom.arrayType, schemaTo.arrayType);
            default:
                throw new Error(`Unsupported data type: ${schemaFrom.type}`);
        }
    }
    getPropertiesTreeFromSchema(schema) {
        switch (schema.type) {
            case dataSchema_1.SimpleDataType.Text:
            case dataSchema_1.SimpleDataType.Number:
            case dataSchema_1.SimpleDataType.Date:
            case dataSchema_1.SimpleDataType.YesNo:
                return [];
            case dataSchema_1.ComplexDataType.Array:
                return this.getPropertiesTreeFromSchema(schema.arrayType);
            case dataSchema_1.ComplexDataType.Object:
                return Object.entries(schema.properties || {}).map(([key, value]) => ({
                    name: key,
                    type: value.type,
                    children: this.getPropertiesTreeFromSchema(value),
                }));
            default:
                throw new Error(`Unsupported data type: ${schema.type}`);
        }
    }
}
exports.DataSchemaHandler = DataSchemaHandler;
