import {
  ComplexDataType,
  DataSchema,
  SimpleDataType,
  DataTypes,
  ContentDataType,
} from './types/dataSchema';

type PropertyItem = {
  name: string;
  type: DataTypes | DataTypes[];
  children?: PropertyItem[];
};

type PropertyTree = PropertyItem[];

export type CompatiblePaths = { from: string; to: string }[];

export class DataSchemaHandler {
  public getPropertiesTree(schema: DataSchema): PropertyTree {
    return this.getPropertiesTreeFromSchema(schema);
  }

  public isSchemasCompatible(schema: DataSchema, schemaToCompare: DataSchema): boolean {
    return this.isSchemasCompatibleRecursive(schema, schemaToCompare);
  }

  public isSchemaPartiallyCompatible(
    schemaFrom: DataSchema,
    schemaTo: DataSchema,
    cb: (compatiblePaths: string[]) => any,
  ): boolean {
    const compatiblePaths: string[] = [];

    this.walkThroughPropertiesRecursive(schemaFrom, (partialSchema, path) => {
      if (this.isSchemasCompatibleRecursive(partialSchema, schemaTo)) {
        compatiblePaths.push(path);
      }
    });

    cb(compatiblePaths);

    return compatiblePaths.length > 0;
  }

  public isSchemaPartiallyCompatibleWithTopLevelProperties(
    schemaFrom: DataSchema,
    schemaTo: DataSchema,
    cb: (compatiblePaths: CompatiblePaths) => any,
  ): boolean {
    const compatiblePaths: CompatiblePaths = [];

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

  public validateSchema(schema: DataSchema): boolean {
    if (schema.type !== ComplexDataType.Object && schema.properties) {
      return false;
    }

    return true;
  }

  public walkThroughPropertiesRecursive(
    schema: DataSchema,
    callback: (partialSchema: DataSchema, path: string) => void, // path - like lodash path
  ) {
    switch (schema.type) {
      case SimpleDataType.Text:
      case SimpleDataType.Number:
      case SimpleDataType.Date:
      case SimpleDataType.YesNo:
      case ContentDataType.File:
      case ContentDataType.Image:
      case ContentDataType.Video:
      case ContentDataType.Audio:
        callback(schema, '');
        break;
      case ComplexDataType.Object:
        Object.entries(schema.properties || {}).forEach(
          ([key, value]: [string, DataSchema]) => {
            this.walkThroughPropertiesRecursive(
              value,
              (partialSchema, path) => {
                callback(partialSchema, `.${key}${path}`);
              },
            );
          },
        );
        break;
      case ComplexDataType.Array:
        this.walkThroughPropertiesRecursive(
          schema.arrayType!,
          (dSchema, path) => {
            callback(dSchema, `[]${path}`);
          },
        );
        break;
      default:
        throw new Error(`Unsupported data type: ${schema.type}`);
    }
  }

  public getSchemaFromPath(schema: DataSchema, path: string): DataSchema {
    const pathParts = path.split(/\.|\[\]/g).filter((part) => part !== '');
    let currentSchema = schema;

    for (const pathPart of pathParts) {
      switch (currentSchema.type) {
        case ComplexDataType.Object:
          currentSchema = currentSchema.properties![pathPart];
          break;
        case ComplexDataType.Array:
          currentSchema = currentSchema.arrayType!;
          break;
        default:
          throw new Error(
            `Unsupported data type: ${currentSchema.type} at path: ${path}`,
          );
      }
    }

    return currentSchema;
  }

  private isSchemasCompatibleRecursive(
    schemaFrom: DataSchema,
    schemaTo: DataSchema,
  ): boolean {
    if (schemaFrom.type !== schemaTo.type) {
      return false;
    }

    switch (schemaFrom.type) {
      case SimpleDataType.Text:
      case SimpleDataType.Number:
      case SimpleDataType.Date:
      case SimpleDataType.YesNo:
      case ContentDataType.File:
      case ContentDataType.Image:
      case ContentDataType.Video:
      case ContentDataType.Audio:
        return true;
      case ComplexDataType.Object:
        return Object.entries(schemaFrom.properties || {}).every(
          ([key, value]) => {
            const schemaToProperty = schemaTo.properties?.[key];
            if (!schemaToProperty) {
              return false;
            }
            return this.isSchemasCompatibleRecursive(value, schemaToProperty);
          },
        );
      case ComplexDataType.Array:
        return this.isSchemasCompatibleRecursive(
          schemaFrom.arrayType!,
          schemaTo.arrayType!,
        );
      default:
        throw new Error(`Unsupported data type: ${schemaFrom.type}`);
    }
  }

  private getPropertiesTreeFromSchema(schema: DataSchema): PropertyTree {
    switch (schema.type) {
      case SimpleDataType.Text:
      case SimpleDataType.Number:
      case SimpleDataType.Date:
      case SimpleDataType.YesNo:
        return [];
      case ComplexDataType.Array:
        return this.getPropertiesTreeFromSchema(schema.arrayType!);
      case ComplexDataType.Object:
        return Object.entries(schema.properties || {}).map(
          ([key, value]: [string, DataSchema]) => ({
            name: key,
            type: value.type,
            children: this.getPropertiesTreeFromSchema(value),
          }),
        );
      default:
        throw new Error(`Unsupported data type: ${schema.type}`);
    }
  }
}
