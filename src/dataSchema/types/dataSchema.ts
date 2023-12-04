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

export type DataTypes = SimpleDataType | ComplexDataType | FormatDataType | ContentDataType;

export type DataSchema = {
  type: DataTypes | DataTypes[];
  properties?: {
    [key: string]: DataSchema;
  }
  arrayType?: DataSchema;
  description?: string;
  defaultValue?: any;
  required?: boolean;
};
