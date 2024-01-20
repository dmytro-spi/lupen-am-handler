export enum SimpleDataType {
  Text = 'text',
  Number = 'number',
  Date = 'date',
  YesNo = 'yesNo',
}

export enum FormatDataType {
  Money = 'money',
  PhoneNumber = 'phoneNumber',
  Email = 'email',
  Url = 'url',
}

export enum ContentDataType {
  Image = 'image',
  Video = 'video',
  Audio = 'audio',
  File = 'file',
}

export enum ComplexDataType {
  Object = 'object',
  Array = 'array',
}

export enum SpecialDataType {
  Any = 'any',
}

export type DataTypes = SimpleDataType | ComplexDataType | FormatDataType | ContentDataType | SpecialDataType;

export type DataSchema = {
  type: DataTypes; // | DataTypes[];
  properties?: {
    [key: string]: DataSchema;
  }
  arrayType?: DataSchema;
  description?: string;
  defaultValue?: any;
  required?: boolean;
};


// Data schema compatibility ----------------------------------------------------
export enum CompatibilitySide {
  Source = 'source',
  Target = 'target',
}

export enum SchemasCompatibilityTypes {
  Direct = 'direct', // compatible
  Conditional = 'conditional', // need to check value existence
  ArrayItem = 'arrayItem', // can use with array item, need to check value existence
}

export type Compatibility = {
  id: string;
  side: CompatibilitySide;
  type: SchemasCompatibilityTypes;
}

export type DataSchemaWithCompatibility = DataSchema & {
  properties?: {
    [key: string]: DataSchemaWithCompatibility;
  }
  compatibility?: Compatibility[];
}
