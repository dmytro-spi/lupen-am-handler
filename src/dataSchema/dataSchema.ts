import { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import {
  ComplexDataType,
  DataSchema,
  SimpleDataType,
  DataTypes,
  ContentDataType,
  SchemasCompatibilityTypes,
  DataSchemaWithCompatibility,
  CompatibilitySide,
  SpecialDataType,
} from './types/dataSchema';
import pathValidateAndFormat from '../actionMap/helpers/pathValidateAndFormat';

// type PropertyItem = {
//   name: string;
//   type: DataTypes | DataTypes[];
//   children?: PropertyItem[];
// };

// type PropertyTree = PropertyItem[];

// export type CompatiblePaths = { from: string; to: string, compatibilityType: SchemasCompatibilityTypes }[];

export class DataSchemaHandler {
  // public getPropertiesTree(schema: DataSchema): PropertyTree {
  //   return this.getPropertiesTreeFromSchema(schema);
  // }

  public isSchemasCompatible(schema: DataSchema, schemaToCompare: DataSchema): boolean {
    return this.isSchemasCompatibleRecursive(schema, schemaToCompare);
  }

  public findCompatibilities(
    source: DataSchema,
    target: DataSchema,
    cb: (source: DataSchemaWithCompatibility, target: DataSchemaWithCompatibility) => void,
  ): boolean {
    if (!this.validateSchema(source) || !this.validateSchema(target)) {
      throw new Error('Invalid schemas');
    }

    const someCompatible = false;

    const sourceC = cloneDeep(source) as DataSchemaWithCompatibility;
    const targetC = cloneDeep(target) as DataSchemaWithCompatibility;

    const sourceDataSchemas: DataSchemaWithCompatibility[] = [];
    const targetDataSchemas: DataSchemaWithCompatibility[] = Object.values(targetC.properties || {});

    this.walkThroughPropertiesRecursive(sourceC, (partialSchema) => {
      sourceDataSchemas.push(partialSchema);
    });

    for (const sourceSchema of sourceDataSchemas) {
      for (const targetSchema of targetDataSchemas) {
        if (this.isSchemasCompatibleRecursive({ ...sourceSchema, required: true }, targetSchema)) {
          sourceSchema.compatibility = sourceSchema.compatibility || [];
          targetSchema.compatibility = targetSchema.compatibility || [];

          const uuid = uuidv4();
          const type = !sourceSchema.required && targetSchema.required
            ? SchemasCompatibilityTypes.Conditional
            : SchemasCompatibilityTypes.Direct;

          sourceSchema.compatibility.push({
            id: uuid,
            side: CompatibilitySide.Source,
            type,
          });
          targetSchema.compatibility.push({
            id: uuid,
            side: CompatibilitySide.Target,
            type,
          });
        }

        if (
          sourceSchema.type === ComplexDataType.Array
          && this.isSchemasCompatibleRecursive(sourceSchema.arrayType!, targetSchema)
        ) {
          sourceSchema.compatibility = sourceSchema.compatibility || [];
          targetSchema.compatibility = targetSchema.compatibility || [];

          const uuid = uuidv4();

          sourceSchema.compatibility.push({
            id: uuid,
            side: CompatibilitySide.Source,
            type: SchemasCompatibilityTypes.ArrayItem,
          });
          targetSchema.compatibility.push({
            id: uuid,
            side: CompatibilitySide.Target,
            type: SchemasCompatibilityTypes.ArrayItem,
          });
        }
      }
    }

    return someCompatible;
  }

  // public isSchemaPartiallyCompatible(
  //   schemaFrom: DataSchema,
  //   schemaTo: DataSchema,
  //   cb: (compatiblePaths: string[]) => any,
  // ): boolean {
  //   const compatiblePaths: string[] = [];

  //   this.walkThroughPropertiesRecursive(schemaFrom, (partialSchema, path) => {
  //     if (this.isSchemasCompatibleRecursive(partialSchema, schemaTo)) {
  //       compatiblePaths.push(path);
  //     }
  //   });

  //   cb(compatiblePaths);

  //   return compatiblePaths.length > 0;
  // }

  // public isPartiallyCompatible(
  //   schemaFrom: DataSchema,
  //   schemaTo: DataSchema,
  //   cb: (compatiblePaths: CompatiblePaths) => any,
  // ): boolean {
  //   const compatiblePaths: CompatiblePaths = [];

  //   Object.entries(schemaTo.properties || {}).forEach(([key, destProperty]) => {
  //     this.walkThroughPropertiesRecursive(schemaFrom, (partialSchema, path) => {
  //       if (this.isSchemasCompatibleRecursive(partialSchema, destProperty)) {
  //         compatiblePaths.push({ from: path, to: key, compatibilityType: SchemasCompatibilityTypes.Direct });
  //       }

  //       if (
  //         !partialSchema.required
  //           && destProperty.required
  //           && this.isSchemasCompatibleRecursive({ ...partialSchema, required: true }, destProperty)
  //       ) {
  //         compatiblePaths.push({ from: path, to: key, compatibilityType: SchemasCompatibilityTypes.Conditional });
  //       }

  //       if (
  //         partialSchema.type === ComplexDataType.Array
  //           && this.isSchemasCompatibleRecursive(partialSchema.arrayType!, destProperty)
  //       ) {
  //         compatiblePaths.push({
  //           from: path,
  //           to: key,
  //           compatibilityType: SchemasCompatibilityTypes.ForEach,
  //         });
  //       }
  //     });
  //   });

  //   cb(compatiblePaths);

  //   return compatiblePaths.length > 0;
  // }

  public validateSchema(schema: DataSchema): boolean {
    if (schema.type !== ComplexDataType.Object && schema.properties) {
      return false;
    }

    return true;
  }

  public walkThroughPropertiesRecursive(
    schema: DataSchema,
    callback: (partialSchema: DataSchema) => void,
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
      case SpecialDataType.Any:
        callback(schema);
        break;
      case ComplexDataType.Object:
        Object.entries(schema.properties || {}).forEach(
          ([key, value]: [string, DataSchema]) => {
            this.walkThroughPropertiesRecursive(
              value,
              (partialSchema) => {
                callback(partialSchema);
              },
            );
          },
        );
        break;
      case ComplexDataType.Array:
        this.walkThroughPropertiesRecursive(
          schema.arrayType!,
          (dSchema) => {
            callback(dSchema);
          },
        );
        break;
      default:
        throw new Error(`Unsupported data type: ${schema.type}`);
    }
  }

  public getSchemaFromPath(schema: DataSchema, path: string): DataSchema {
    const pathParts = pathValidateAndFormat(path)
      .replace(/[\[\]\d]/g, "")
      .split(".")
      .filter((part) => part !== '');

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
        return schemaFrom.required === schemaTo.required || !schemaTo.required;
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

  // private getPropertiesTreeFromSchema(schema: DataSchema): PropertyTree {
  //   switch (schema.type) {
  //     case SimpleDataType.Text:
  //     case SimpleDataType.Number:
  //     case SimpleDataType.Date:
  //     case SimpleDataType.YesNo:
  //       return [];
  //     case ComplexDataType.Array:
  //       return this.getPropertiesTreeFromSchema(schema.arrayType!);
  //     case ComplexDataType.Object:
  //       return Object.entries(schema.properties || {}).map(
  //         ([key, value]: [string, DataSchema]) => ({
  //           name: key,
  //           type: value.type,
  //           children: this.getPropertiesTreeFromSchema(value),
  //         }),
  //       );
  //     default:
  //       throw new Error(`Unsupported data type: ${schema.type}`);
  //   }
  // }
}
