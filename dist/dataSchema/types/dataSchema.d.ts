export declare enum SimpleDataType {
    Text = "text",
    Number = "number",
    Date = "date",
    YesNo = "yesNo"
}
export declare enum FormatDataType {
    Money = "money",
    PhoneNumber = "phoneNumber",
    Email = "email",
    Url = "url"
}
export declare enum ContentDataType {
    Image = "image",
    Video = "video",
    Audio = "audio",
    File = "file"
}
export declare enum ComplexDataType {
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
