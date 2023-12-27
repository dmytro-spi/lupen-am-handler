import {v4 as $hgUW1$v4} from "uuid";
import {BSON as $hgUW1$BSON} from "bson";
import {object as $hgUW1$object, string as $hgUW1$string, array as $hgUW1$array, mixed as $hgUW1$mixed, number as $hgUW1$number, lazy as $hgUW1$lazy, boolean as $hgUW1$boolean} from "yup";



const $b224c477343e41e6$export$ede5a19a386fa7ea = (id)=>`memory::${id}`;
const $b224c477343e41e6$export$a82221618652cb9f = (name)=>`constant::${name}`;
const $b224c477343e41e6$export$85ca6aa0f7ebde22 = (name)=>`model::${name}`;
const $b224c477343e41e6$export$bf648471fa87db4a = (id)=>`output::${id}`;
var $b224c477343e41e6$export$e035c9caa79ccaa9;
(function(ConditionOperator) {
    ConditionOperator["Equal"] = "==";
    ConditionOperator["StrongEqual"] = "===";
    ConditionOperator["NotEqual"] = "!=";
    ConditionOperator["StrongNotEqual"] = "!==";
    ConditionOperator["GreaterThan"] = ">";
    ConditionOperator["GreaterThanOrEqual"] = ">=";
    ConditionOperator["LessThan"] = "<";
    ConditionOperator["LessThanOrEqual"] = "<=";
})($b224c477343e41e6$export$e035c9caa79ccaa9 || ($b224c477343e41e6$export$e035c9caa79ccaa9 = {}));
var $b224c477343e41e6$export$dec6c71a4257ac74;
(function(OutputDirection) {
    OutputDirection["Down"] = "down";
    OutputDirection["Right"] = "right";
    OutputDirection["Up"] = "up";
    OutputDirection["Left"] = "left";
})($b224c477343e41e6$export$dec6c71a4257ac74 || ($b224c477343e41e6$export$dec6c71a4257ac74 = {}));
var $b224c477343e41e6$export$be94d7b677b041dd;
(function(OutputType) {
    OutputType["Default"] = "default";
    OutputType["Conditional"] = "conditional";
    OutputType["ForEach"] = "forEach";
})($b224c477343e41e6$export$be94d7b677b041dd || ($b224c477343e41e6$export$be94d7b677b041dd = {}));
var $b224c477343e41e6$export$b58a0cc33096f1fb;
(function(TileType) {
    TileType["Accessor"] = "accessor";
    TileType["Action"] = "action";
    TileType["Memory"] = "memory";
})($b224c477343e41e6$export$b58a0cc33096f1fb || ($b224c477343e41e6$export$b58a0cc33096f1fb = {}));
var $b224c477343e41e6$export$1f02415756f5fb16;
(function(AccessorType) {
    AccessorType["Model"] = "model";
    AccessorType["Constant"] = "constant";
    AccessorType["Memory"] = "memory";
    AccessorType["DataIn"] = "dataIn";
})($b224c477343e41e6$export$1f02415756f5fb16 || ($b224c477343e41e6$export$1f02415756f5fb16 = {}));
var $b224c477343e41e6$export$5c1a605137b9ecb3;
(function(ModelAccessOperation) {
    ModelAccessOperation["FindOne"] = "findOne";
    ModelAccessOperation["FindMany"] = "findMany";
    ModelAccessOperation["FindFirst"] = "findFirst";
    ModelAccessOperation["FindLast"] = "findLast";
})($b224c477343e41e6$export$5c1a605137b9ecb3 || ($b224c477343e41e6$export$5c1a605137b9ecb3 = {}));
var $b224c477343e41e6$export$90d94503f4d956ff;
(function(MemoryType) {
    MemoryType["DataOut"] = "dataOut";
    MemoryType["Internal"] = "internal";
    MemoryType["Model"] = "model";
})($b224c477343e41e6$export$90d94503f4d956ff || ($b224c477343e41e6$export$90d94503f4d956ff = {}));
var $b224c477343e41e6$export$6c7545f640252ea7;
(function(ModelMemoryOperation) {
    ModelMemoryOperation["Create"] = "create";
    ModelMemoryOperation["Update"] = "update";
    ModelMemoryOperation["Delete"] = "delete";
})($b224c477343e41e6$export$6c7545f640252ea7 || ($b224c477343e41e6$export$6c7545f640252ea7 = {}));





// OutputDirection schema
const $0c1e32e0c308ab33$var$outputDirectionSchema = $hgUW1$mixed().oneOf(Object.values((0, $b224c477343e41e6$export$dec6c71a4257ac74)));
// OutputType schema
const $0c1e32e0c308ab33$var$outputTypeSchema = $hgUW1$mixed().oneOf(Object.values((0, $b224c477343e41e6$export$be94d7b677b041dd)));
// Base OutputGeneral schema
const $0c1e32e0c308ab33$var$outputGeneralSchema = $hgUW1$object().shape({
    id: $hgUW1$string().required(),
    direction: $0c1e32e0c308ab33$var$outputDirectionSchema.required(),
    coordinates: $hgUW1$array().of($hgUW1$number()).min(2).max(2).required(),
    toArgument: $hgUW1$string().nullable(),
    type: $0c1e32e0c308ab33$var$outputTypeSchema.required(),
    outputPath: $hgUW1$string().nullable()
});
// DefaultOutput schema
const $0c1e32e0c308ab33$var$defaultOutputSchema = $0c1e32e0c308ab33$var$outputGeneralSchema.concat($hgUW1$object({
    type: $hgUW1$mixed().oneOf([
        (0, $b224c477343e41e6$export$be94d7b677b041dd).Default
    ])
}));
// ConditionalOutput schema
const $0c1e32e0c308ab33$var$conditionalOutputSchema = $0c1e32e0c308ab33$var$outputGeneralSchema.concat($hgUW1$object({
    type: $hgUW1$mixed().oneOf([
        (0, $b224c477343e41e6$export$be94d7b677b041dd).Conditional
    ]),
    condition: $hgUW1$string().required()
}));
// ForEachOutput schema
const $0c1e32e0c308ab33$var$forEachOutputSchema = $0c1e32e0c308ab33$var$outputGeneralSchema.concat($hgUW1$object({
    type: $hgUW1$mixed().oneOf([
        (0, $b224c477343e41e6$export$be94d7b677b041dd).ForEach
    ])
}));
// Combined Output schema
const $0c1e32e0c308ab33$var$outputSchema = $hgUW1$lazy((value)=>{
    switch(value.type){
        case (0, $b224c477343e41e6$export$be94d7b677b041dd).Default:
            return $0c1e32e0c308ab33$var$defaultOutputSchema;
        case (0, $b224c477343e41e6$export$be94d7b677b041dd).Conditional:
            return $0c1e32e0c308ab33$var$conditionalOutputSchema;
        case (0, $b224c477343e41e6$export$be94d7b677b041dd).ForEach:
            return $0c1e32e0c308ab33$var$forEachOutputSchema;
        default:
            return $hgUW1$object().shape({});
    }
});
var $0c1e32e0c308ab33$export$2e2bcd8739ae039 = $0c1e32e0c308ab33$var$outputSchema;





var $8f8d2861b2e1d35f$export$2bd38b90f09fb16c;
(function(SimpleDataType) {
    SimpleDataType["Text"] = "text";
    SimpleDataType["Number"] = "number";
    SimpleDataType["Date"] = "date";
    SimpleDataType["YesNo"] = "yesNo";
})($8f8d2861b2e1d35f$export$2bd38b90f09fb16c || ($8f8d2861b2e1d35f$export$2bd38b90f09fb16c = {}));
var $8f8d2861b2e1d35f$export$a914443d1add2f4c;
(function(FormatDataType) {
    FormatDataType["Money"] = "money";
    FormatDataType["PhoneNumber"] = "phoneNumber";
    FormatDataType["Email"] = "email";
    FormatDataType["Url"] = "url";
})($8f8d2861b2e1d35f$export$a914443d1add2f4c || ($8f8d2861b2e1d35f$export$a914443d1add2f4c = {}));
var $8f8d2861b2e1d35f$export$b00b62a09b73016e;
(function(ContentDataType) {
    ContentDataType["Image"] = "image";
    ContentDataType["Video"] = "video";
    ContentDataType["Audio"] = "audio";
    ContentDataType["File"] = "file";
})($8f8d2861b2e1d35f$export$b00b62a09b73016e || ($8f8d2861b2e1d35f$export$b00b62a09b73016e = {}));
var $8f8d2861b2e1d35f$export$1ae122a9008ff510;
(function(ComplexDataType) {
    ComplexDataType["Object"] = "object";
    ComplexDataType["Array"] = "array";
})($8f8d2861b2e1d35f$export$1ae122a9008ff510 || ($8f8d2861b2e1d35f$export$1ae122a9008ff510 = {}));


// SimpleDataType, FormatDataType, ContentDataType, ComplexDataType enums
const $3500a9346d7cfe7a$var$simpleDataTypeSchema = $hgUW1$mixed().oneOf(Object.values((0, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c)));
const $3500a9346d7cfe7a$var$formatDataTypeSchema = $hgUW1$mixed().oneOf(Object.values((0, $8f8d2861b2e1d35f$export$a914443d1add2f4c)));
const $3500a9346d7cfe7a$var$contentDataTypeSchema = $hgUW1$mixed().oneOf(Object.values((0, $8f8d2861b2e1d35f$export$b00b62a09b73016e)));
const $3500a9346d7cfe7a$var$complexDataTypeSchema = $hgUW1$mixed().oneOf(Object.values((0, $8f8d2861b2e1d35f$export$1ae122a9008ff510)));
// DataTypes schema
const $3500a9346d7cfe7a$var$dataTypesSchema = $hgUW1$lazy((value)=>$hgUW1$array().of($hgUW1$mixed().oneOf([
        $3500a9346d7cfe7a$var$simpleDataTypeSchema,
        $3500a9346d7cfe7a$var$formatDataTypeSchema,
        $3500a9346d7cfe7a$var$contentDataTypeSchema,
        $3500a9346d7cfe7a$var$complexDataTypeSchema
    ])).required());
// Recursive DataSchema schema
const $3500a9346d7cfe7a$var$dataSchema = $hgUW1$object({
    type: $3500a9346d7cfe7a$var$dataTypesSchema,
    properties: $hgUW1$lazy((value)=>$hgUW1$object().shape(Object.keys(value).reduce((shape, key)=>{
            shape[key] = $3500a9346d7cfe7a$var$dataSchema;
            return shape;
        }, {})).nullable()),
    arrayType: $hgUW1$lazy(()=>$3500a9346d7cfe7a$var$dataSchema.nullable()),
    description: $hgUW1$string().nullable(),
    defaultValue: $hgUW1$mixed().nullable(),
    required: $hgUW1$boolean().nullable()
});
var $3500a9346d7cfe7a$export$2e2bcd8739ae039 = $3500a9346d7cfe7a$var$dataSchema;


const $8e667be3765ae363$export$f2c1d8115810088c = $hgUW1$object().shape({
    name: $hgUW1$string().required(),
    label: $hgUW1$string().required(),
    type: (0, $3500a9346d7cfe7a$export$2e2bcd8739ae039).required(),
    required: $hgUW1$boolean().required(),
    defaultValue: $hgUW1$mixed().nullable()
});
const $8e667be3765ae363$export$3f22e65960887329 = $hgUW1$mixed().oneOf(Object.values((0, $b224c477343e41e6$export$b58a0cc33096f1fb)));
const $8e667be3765ae363$export$97a6fcb49b2b0798 = $hgUW1$mixed().oneOf(Object.values((0, $b224c477343e41e6$export$1f02415756f5fb16)));
const $8e667be3765ae363$export$923e425a87884b8a = $hgUW1$mixed().oneOf(Object.values((0, $b224c477343e41e6$export$5c1a605137b9ecb3)));
const $8e667be3765ae363$export$c50c1c96240d4cab = $hgUW1$mixed().oneOf(Object.values((0, $b224c477343e41e6$export$6c7545f640252ea7)));
const $8e667be3765ae363$export$8da21ffd331f2922 = $hgUW1$object().shape({
    id: $hgUW1$string().required(),
    coordinates: $hgUW1$object().shape({
        start: $hgUW1$array().of($hgUW1$number()).min(2).max(2).required(),
        end: $hgUW1$array().of($hgUW1$number()).min(2).max(2).required()
    }),
    type: $8e667be3765ae363$export$3f22e65960887329.required()
});
const $8e667be3765ae363$export$8df29c7063b7517d = $8e667be3765ae363$export$8da21ffd331f2922.concat($hgUW1$object({
    output: $hgUW1$array().of($hgUW1$string()).required(),
    accessType: $8e667be3765ae363$export$97a6fcb49b2b0798.required()
}));
const $8e667be3765ae363$export$334599776679ae92 = $8e667be3765ae363$export$8df29c7063b7517d.concat($hgUW1$object({
    accessType: $hgUW1$mixed().oneOf([
        (0, $b224c477343e41e6$export$1f02415756f5fb16).Constant
    ]),
    constantName: $hgUW1$string().required()
}));
const $8e667be3765ae363$export$9c6325a7d66a12b2 = $8e667be3765ae363$export$8df29c7063b7517d.concat($hgUW1$object({
    accessType: $hgUW1$mixed().oneOf([
        (0, $b224c477343e41e6$export$1f02415756f5fb16).DataIn
    ]),
    dataInProps: $8e667be3765ae363$export$f2c1d8115810088c.required()
}));
const $8e667be3765ae363$export$4d411ef10c1bed0e = $8e667be3765ae363$export$8df29c7063b7517d.concat($hgUW1$object({
    accessType: $hgUW1$mixed().oneOf([
        (0, $b224c477343e41e6$export$1f02415756f5fb16).Memory
    ]),
    memoryTileId: $hgUW1$string().required()
}));
const $8e667be3765ae363$export$334eda1600f280a7 = $8e667be3765ae363$export$8df29c7063b7517d.concat($hgUW1$object({
    accessType: $hgUW1$mixed().oneOf([
        (0, $b224c477343e41e6$export$1f02415756f5fb16).Model
    ]),
    modelName: $hgUW1$string().required(),
    query: $hgUW1$string().required(),
    operation: $8e667be3765ae363$export$923e425a87884b8a.required()
}));
const $8e667be3765ae363$export$c9c64d51056635a7 = $8e667be3765ae363$export$8da21ffd331f2922.concat($hgUW1$object({
    output: $hgUW1$array().of($hgUW1$string()).required(),
    actionId: $hgUW1$string().required(),
    input: $hgUW1$array().of($hgUW1$string()).required()
}));
const $8e667be3765ae363$export$48e226a6daf86e70 = $8e667be3765ae363$export$8da21ffd331f2922.concat($hgUW1$object({
    input: $hgUW1$array().of($hgUW1$string()).required(),
    memoryType: $hgUW1$mixed().oneOf(Object.values((0, $b224c477343e41e6$export$90d94503f4d956ff))).required()
}));
const $8e667be3765ae363$export$1253cb500ffddf18 = $8e667be3765ae363$export$48e226a6daf86e70.concat($hgUW1$object({
    memoryType: $hgUW1$mixed().oneOf([
        (0, $b224c477343e41e6$export$90d94503f4d956ff).Model
    ]),
    modelName: $hgUW1$string().required(),
    query: $hgUW1$string().required(),
    operation: $8e667be3765ae363$export$c50c1c96240d4cab.required()
}));
// Combined Tile schema
const $8e667be3765ae363$var$tileSchema = $hgUW1$lazy((value)=>{
    switch(value.type){
        case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Accessor:
            switch(value.accessType){
                case (0, $b224c477343e41e6$export$1f02415756f5fb16).Constant:
                    return $8e667be3765ae363$export$334599776679ae92;
                case (0, $b224c477343e41e6$export$1f02415756f5fb16).DataIn:
                    return $8e667be3765ae363$export$9c6325a7d66a12b2;
                case (0, $b224c477343e41e6$export$1f02415756f5fb16).Memory:
                    return $8e667be3765ae363$export$4d411ef10c1bed0e;
                case (0, $b224c477343e41e6$export$1f02415756f5fb16).Model:
                    return $8e667be3765ae363$export$334eda1600f280a7;
                default:
                    return $8e667be3765ae363$export$8df29c7063b7517d;
            }
        case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Action:
            return $8e667be3765ae363$export$c9c64d51056635a7;
        case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Memory:
            return value.memoryType === (0, $b224c477343e41e6$export$90d94503f4d956ff).Model ? $8e667be3765ae363$export$1253cb500ffddf18 : $8e667be3765ae363$export$48e226a6daf86e70;
        default:
            return $hgUW1$object().shape({
                type: $hgUW1$mixed().oneOf(Object.values((0, $b224c477343e41e6$export$b58a0cc33096f1fb))).required()
            });
    }
});
var $8e667be3765ae363$export$2e2bcd8739ae039 = $8e667be3765ae363$var$tileSchema;


// ActionMap schema
const $65496cb9dfa51acd$var$actionMapSchema = $hgUW1$object().shape({
    id: $hgUW1$string().required(),
    name: $hgUW1$string().required(),
    outputs: $hgUW1$array().of((0, $0c1e32e0c308ab33$export$2e2bcd8739ae039)).required(),
    tiles: $hgUW1$array().of((0, $8e667be3765ae363$export$2e2bcd8739ae039)).required()
});
var $65496cb9dfa51acd$export$2e2bcd8739ae039 = $65496cb9dfa51acd$var$actionMapSchema;




class $a3e7ad90fc86cc8c$export$e073683b1b98b026 {
    getPropertiesTree(schema) {
        return this.getPropertiesTreeFromSchema(schema);
    }
    isSchemasCompatible(schema, schemaToCompare) {
        return this.isSchemasCompatibleRecursive(schema, schemaToCompare);
    }
    isSchemaPartiallyCompatible(schemaFrom, schemaTo, cb) {
        const compatiblePaths = [];
        this.walkThroughPropertiesRecursive(schemaFrom, (partialSchema, path)=>{
            if (this.isSchemasCompatibleRecursive(partialSchema, schemaTo)) compatiblePaths.push(path);
        });
        cb(compatiblePaths);
        return compatiblePaths.length > 0;
    }
    isSchemaPartiallyCompatibleWithTopLevelProperties(schemaFrom, schemaTo, cb) {
        const compatiblePaths = [];
        Object.entries(schemaTo.properties || {}).forEach(([key, value])=>{
            this.walkThroughPropertiesRecursive(schemaFrom, (partialSchema, path)=>{
                if (this.isSchemasCompatibleRecursive(partialSchema, value)) compatiblePaths.push({
                    from: path,
                    to: `.${key}`
                });
            });
        });
        cb(compatiblePaths);
        return compatiblePaths.length > 0;
    }
    validateSchema(schema) {
        if (schema.type !== (0, $8f8d2861b2e1d35f$export$1ae122a9008ff510).Object && schema.properties) return false;
        return true;
    }
    walkThroughPropertiesRecursive(schema, callback) {
        switch(schema.type){
            case (0, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c).Text:
            case (0, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c).Number:
            case (0, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c).Date:
            case (0, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c).YesNo:
            case (0, $8f8d2861b2e1d35f$export$b00b62a09b73016e).File:
            case (0, $8f8d2861b2e1d35f$export$b00b62a09b73016e).Image:
            case (0, $8f8d2861b2e1d35f$export$b00b62a09b73016e).Video:
            case (0, $8f8d2861b2e1d35f$export$b00b62a09b73016e).Audio:
                callback(schema, "");
                break;
            case (0, $8f8d2861b2e1d35f$export$1ae122a9008ff510).Object:
                Object.entries(schema.properties || {}).forEach(([key, value])=>{
                    this.walkThroughPropertiesRecursive(value, (partialSchema, path)=>{
                        callback(partialSchema, `.${key}${path}`);
                    });
                });
                break;
            case (0, $8f8d2861b2e1d35f$export$1ae122a9008ff510).Array:
                this.walkThroughPropertiesRecursive(schema.arrayType, (dSchema, path)=>{
                    callback(dSchema, `[]${path}`);
                });
                break;
            default:
                throw new Error(`Unsupported data type: ${schema.type}`);
        }
    }
    getSchemaFromPath(schema, path) {
        const pathParts = path.split(/\.|\[\]/g).filter((part)=>part !== "");
        let currentSchema = schema;
        for (const pathPart of pathParts)switch(currentSchema.type){
            case (0, $8f8d2861b2e1d35f$export$1ae122a9008ff510).Object:
                currentSchema = currentSchema.properties[pathPart];
                break;
            case (0, $8f8d2861b2e1d35f$export$1ae122a9008ff510).Array:
                currentSchema = currentSchema.arrayType;
                break;
            default:
                throw new Error(`Unsupported data type: ${currentSchema.type} at path: ${path}`);
        }
        return currentSchema;
    }
    isSchemasCompatibleRecursive(schemaFrom, schemaTo) {
        if (schemaFrom.type !== schemaTo.type) return false;
        switch(schemaFrom.type){
            case (0, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c).Text:
            case (0, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c).Number:
            case (0, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c).Date:
            case (0, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c).YesNo:
            case (0, $8f8d2861b2e1d35f$export$b00b62a09b73016e).File:
            case (0, $8f8d2861b2e1d35f$export$b00b62a09b73016e).Image:
            case (0, $8f8d2861b2e1d35f$export$b00b62a09b73016e).Video:
            case (0, $8f8d2861b2e1d35f$export$b00b62a09b73016e).Audio:
                return true;
            case (0, $8f8d2861b2e1d35f$export$1ae122a9008ff510).Object:
                return Object.entries(schemaFrom.properties || {}).every(([key, value])=>{
                    const schemaToProperty = schemaTo.properties?.[key];
                    if (!schemaToProperty) return false;
                    return this.isSchemasCompatibleRecursive(value, schemaToProperty);
                });
            case (0, $8f8d2861b2e1d35f$export$1ae122a9008ff510).Array:
                return this.isSchemasCompatibleRecursive(schemaFrom.arrayType, schemaTo.arrayType);
            default:
                throw new Error(`Unsupported data type: ${schemaFrom.type}`);
        }
    }
    getPropertiesTreeFromSchema(schema) {
        switch(schema.type){
            case (0, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c).Text:
            case (0, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c).Number:
            case (0, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c).Date:
            case (0, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c).YesNo:
                return [];
            case (0, $8f8d2861b2e1d35f$export$1ae122a9008ff510).Array:
                return this.getPropertiesTreeFromSchema(schema.arrayType);
            case (0, $8f8d2861b2e1d35f$export$1ae122a9008ff510).Object:
                return Object.entries(schema.properties || {}).map(([key, value])=>({
                        name: key,
                        type: value.type,
                        children: this.getPropertiesTreeFromSchema(value)
                    }));
            default:
                throw new Error(`Unsupported data type: ${schema.type}`);
        }
    }
}



class $54eb9ffd392831bf$export$a82bfd0bc6a25e39 {
    constructor(actionMap, models, actionFetcher, options){
        this.models = models;
        this.actionFetcher = actionFetcher;
        this.dataSchemaHandler = new (0, $a3e7ad90fc86cc8c$export$e073683b1b98b026)();
        this.actionMap = $54eb9ffd392831bf$export$a82bfd0bc6a25e39.emptyActionMap;
        this.changeStack = [];
        this.futureStack = [];
        if (actionMap) {
            this.actionMap = actionMap;
            if (!options?.skipValidation) this.validateSchema();
        } else this.createEmptyActionMap();
    }
    // PUBLIC ------------------------------------------------------------------
    get currentActionMap() {
        return this.actionMap;
    }
    static get emptyActionMap() {
        return {
            id: (0, $hgUW1$v4)(),
            name: "New Action Map",
            tiles: [],
            outputs: []
        };
    }
    /**
   * Creates an empty ActionMap with a unique ID and optional name.
   * If no name is provided, the default name 'New Action Map' is used.
   * The function initializes empty arrays for tiles and outputs.
   * 
   * @param {string} [name] - Optional name for the ActionMap. Defaults to 'New Action Map'.
   * @returns {ActionMap} An object representing the new ActionMap with the following properties:
   *                       - id: a unique identifier generated by uuidv4.
   *                       - name: the name of the ActionMap.
   *                       - tiles: an empty array of tiles.
   *                       - outputs: an empty array of outputs.
   */ createEmptyActionMap(name) {
        this.putCurrentToPreviousState();
        this.actionMap = {
            id: (0, $hgUW1$v4)(),
            name: name ?? "New Action Map",
            tiles: [],
            outputs: []
        };
        return this.actionMap;
    }
    /**
   * Renames the current ActionMap with a new specified name.
   * This method updates the 'name' property of the ActionMap and then returns the updated ActionMap.
   * 
   * @param {string} name - The new name to be assigned to the ActionMap.
   * @returns {ActionMap} The updated ActionMap with the new name.
   */ renameActionMap(name) {
        this.actionMap.name = name;
        return this.actionMap;
    }
    /**
   * Validates the action map against a predefined schema.
   *
   * This function compiles and applies the action map schema using AJV to
   * validate the current state of the action map. If the action map fails
   * validation, an error is thrown detailing the validation issues.
   *
   * @returns {boolean} Returns true if the action map is valid according to
   *           the schema.
   * @throws {Error} Throws an error if the action map fails schema validation,
   *         with details about the validation errors.
   */ async validateSchema() {
        await (0, $65496cb9dfa51acd$export$2e2bcd8739ae039).validate(this.actionMap, {
            abortEarly: false
        });
        return true;
    }
    /**
   * Asynchronously retrieves the output schema for an Accessor tile.
   *
   * This function determines the schema based on the source type of the Accessor
   * tile, which is derived from its 'source' property. The source type can be
   * Memory, Model, or Constant, each requiring different handling. It fetches
   * the schema for Memory and Model types but throws an error for the Constant
   * type and unrecognized source types.
   *
   * @param {AccessorTile} tile - The Accessor tile for which to find the output schema.
   * @returns {Promise<DataSchema>} A promise that resolves to the data schema
   *           associated with the Accessor tile's source.
   * @throws {Error} Throws an error for the Constant source type or if the accessor
   *         source type is invalid.
   */ async getAccessorOutputSchema(tile) {
        const source = tile.accessType;
        const sourceType = source[0];
        const sourceId = source[1];
        switch(tile.accessType){
            case (0, $b224c477343e41e6$export$1f02415756f5fb16).Memory:
                return this.getMemorySchema(sourceId);
            case (0, $b224c477343e41e6$export$1f02415756f5fb16).Model:
                {
                    const modelSchema = this.getModelSchema(sourceId);
                    if (tile.operation === (0, $b224c477343e41e6$export$5c1a605137b9ecb3).FindMany) return {
                        type: (0, $8f8d2861b2e1d35f$export$1ae122a9008ff510).Array,
                        arrayType: modelSchema
                    };
                    return modelSchema;
                }
            case (0, $b224c477343e41e6$export$1f02415756f5fb16).Constant:
                throw new Error("No implementation");
            case (0, $b224c477343e41e6$export$1f02415756f5fb16).DataIn:
                throw new Error("No implementation");
            default:
                throw new Error(`Invalid accessor source type: ${sourceType}`);
        }
    }
    /**
   * Validates a tile against its respective schema based on the tile type.
   *
   * This function determines the appropriate validation schema to use based on
   * the tile's type (Accessor, Action, or Memory). It then compiles and applies
   * this schema using AJV to validate the tile. If the tile type is invalid or
   * the tile fails validation, an error is thrown.
   *
   * @param {Tile} tile - The tile object to be validated.
   * @returns {boolean} Returns true if the tile is valid according to its schema.
   * @throws {Error} Throws an error if the tile type is invalid or if the tile
   *         fails schema validation.
   */ async validateTile(tile) {
        switch(tile.type){
            case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Accessor:
                await (0, $8e667be3765ae363$export$8df29c7063b7517d).validate(tile, {
                    abortEarly: false
                });
                break;
            case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Action:
                (0, $8e667be3765ae363$export$c9c64d51056635a7).validate(tile, {
                    abortEarly: false
                });
                break;
            case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Memory:
                (0, $8e667be3765ae363$export$48e226a6daf86e70).validate(tile, {
                    abortEarly: false
                });
                break;
            default:
                throw new Error(`Invalid tile type: ${tile.type}`);
        }
        return true;
    }
    /**
   * Adds a new tile to the action map.
   *
   * This function first validates the provided tile using `validateTile`. If
   * validation is successful, the tile is added to the action map's tiles array.
   * The updated action map is then returned. It assumes that `validateTile`
   * handles any necessary validation and throws errors if the tile is invalid.
   *
   * @param {Tile} tile - The tile object to be added to the action map.
   * @returns {ActionMap} The updated action map with the new tile added.
   */ addTile(tile) {
        this.validateTile(tile);
        this.pushNewState({
            ...this.actionMap,
            tiles: [
                ...this.actionMap.tiles,
                tile
            ]
        });
        return this.actionMap;
    }
    /**
   * Removes a tile from the action map and cleans up its associated inputs and outputs.
   *
   * This function locates a tile by its ID and removes it from the action map. It
   * also identifies and deletes all inputs and outputs associated with this tile.
   * If the tile is not found in the action map, it throws an error. The updated
   * action map is then returned.
   *
   * @param {string} id - The unique identifier of the tile to be removed.
   * @returns {ActionMap} The updated action map after the specified tile and its
   *           associated inputs and outputs have been removed.
   * @throws {Error} Throws an error if the tile with the specified ID is not found.
   */ removeTile(id) {
        const index = this.actionMap.tiles.findIndex((t)=>t.id === id);
        if (index === -1) throw new Error(`Tile ${id} not found`);
        // delete inputs ant outputs for this tile
        const outputsForDelete = this.actionMap.outputs.filter((o)=>this.actionMap.tiles[index].output?.includes(o.id) || this.actionMap.tiles[index].input?.includes(o.id));
        outputsForDelete.forEach((o)=>{
            this.removeOutput(o.id);
        });
        this.actionMap.tiles.splice(index, 1);
        return this.actionMap;
    }
    /**
   * Asynchronously determines if two tiles can be connected.
   *
   * This function evaluates the possibility of connecting two tiles based on their
   * types and data schemas. It supports Memory and Action tile types with specific
   * compatibility rules. The function also utilizes a callback to return compatible
   * paths found during the compatibility check. Returns true if the tiles can be
   * connected, false otherwise.
   *
   * @param {string} fromTileId - The ID of the source tile.
   * @param {string} toTileId - The ID of the destination tile.
   * @param {(compatiblePaths: CompatiblePaths) => void} cb - A callback function
   *        that receives compatible paths determined during the evaluation.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating
   *           whether the tiles can be connected.
   */ async canConnectTiles(fromTileId, toTileId, cb) {
        const fromTile = this.actionMap.tiles.find((t)=>t.id === fromTileId);
        const toTile = this.actionMap.tiles.find((t)=>t.id === toTileId);
        if (toTile?.type === (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Memory) return true;
        if (toTile?.type !== (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Action) return false;
        const fromSchema = await this.getTileOutputSchema(fromTile);
        const toSchema = await this.getActionArgumentsSchema(toTile.actionId);
        return this.dataSchemaHandler.isSchemaPartiallyCompatibleWithTopLevelProperties(fromSchema, toSchema, cb);
    }
    /**
   * Asynchronously adds a new output to the action map and updates related tiles.
   *
   * This function adds a new output with a generated ID to the action map. It
   * ensures that the specified source and destination tiles exist and are
   * compatible for the connection. The output is then linked to these tiles based
   * on their types. Throws errors for non-existent tiles, incompatible tiles,
   * and invalid tile types.
   *
   * @param {Omit<Output, 'id'>} output - The output to be added, excluding the 'id'.
   * @param {string} fromTileId - The ID of the tile from which the output originates.
   * @param {string} toTileId - The ID of the tile to which the output connects.
   * @returns {Promise<ActionMap>} A promise that resolves to the updated action map
   *           with the new output and updated tile connections.
   * @throws {Error} Throws an error if source or destination tiles are not found,
   *           if they are not compatible, or if their types are invalid for adding outputs.
   */ async addOutput(output, fromTileId, toTileId) {
        const fromTile = this.actionMap.tiles.find((t)=>t.id === fromTileId);
        if (!fromTile) throw new Error(`Tile ${fromTileId} not found`);
        const toTile = this.actionMap.tiles.find((t)=>t.id === toTileId);
        if (!toTile) throw new Error(`Tile ${toTileId} not found`);
        let compatiblePaths = [];
        if (!this.canConnectTiles(fromTileId, toTileId, (paths)=>{
            compatiblePaths = paths;
        })) throw new Error(`Tiles ${fromTileId} and ${toTileId} are not compatible`);
        // TODO: check compatiblePaths with output
        const outputId = (0, $hgUW1$v4)();
        this.actionMap.outputs.push({
            id: outputId,
            ...output
        });
        switch(fromTile.type){
            case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Accessor:
                fromTile.output.push(outputId);
                break;
            case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Action:
                fromTile.output.push(outputId);
                break;
            case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Memory:
                throw new Error("Cannot add output to memory tile");
            default:
                throw new Error(`Invalid tile type: ${fromTile.type}`);
        }
        switch(toTile.type){
            case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Accessor:
                throw new Error("Cannot add input to accessor tile");
            case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Action:
                toTile.input[parseInt(output.toArgument)] = outputId;
                break;
            case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Memory:
                toTile.input.push(outputId);
                break;
            default:
                throw new Error(`Invalid tile type: ${toTile.type}`);
        }
        return this.actionMap;
    }
    /**
   * Removes an output from the action map and updates related tiles.
   *
   * This function first attempts to find and remove an output with the specified
   * ID from the action map's outputs array. If the output is not found, it throws
   * an error. It then updates all related tiles within the action map to remove
   * any references to the deleted output. This includes updating input and output
   * connections for tiles based on their type (Accessor, Action, Memory). Throws
   * an error for unrecognized tile types.
   *
   * @param {string} id - The unique identifier of the output to be removed.
   * @returns {ActionMap} The updated action map after removing the output and
   *           updating related tiles.
   * @throws {Error} Throws an error if the output with the specified ID is not found.
   * @throws {Error} Throws an error if it encounters an invalid or unrecognized tile type.
   */ removeOutput(id) {
        const index = this.actionMap.outputs.findIndex((o)=>o.id === id);
        if (index === -1) throw new Error(`Output ${id} not found`);
        this.actionMap.outputs.splice(index, 1);
        // remove output from tiles
        this.actionMap.tiles = this.actionMap.tiles.map((tile)=>{
            const tileCopy = {
                ...tile
            };
            switch(tile.type){
                case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Accessor:
                    tileCopy.output = tile.output.filter((outputId)=>outputId !== id);
                    break;
                case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Action:
                    tileCopy.input = tile.input.filter((outputId)=>outputId !== id);
                    tileCopy.output = tile.output.filter((outputId)=>outputId !== id);
                    break;
                case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Memory:
                    tileCopy.input = tile.input.filter((outputId)=>outputId !== id);
                    break;
                default:
                    throw new Error(`Invalid tile type: ${tile.type}`);
            }
            return tile;
        });
        return this.actionMap;
    }
    /**
   * Updates the coordinates of a specific tile in the action map.
   *
   * This function locates a tile by its ID within the action map. If found, 
   * it updates the tile's start and end coordinates. If the tile is not found, 
   * it throws an error. The updated action map is then returned.
   *
   * @param {string} id - The unique identifier of the tile to be updated.
   * @param {[number, number]} start - The new starting coordinates of the tile.
   * @param {[number, number]} end - The new ending coordinates of the tile.
   * @returns {ActionMap} The updated action map containing the modified tile.
   * @throws {Error} Throws an error if the tile with the specified ID is not found.
   */ updateTileCoordinates(id, start, end) {
        const tile = this.actionMap.tiles.find((t)=>t.id === id);
        if (!tile) throw new Error(`Tile ${id} not found`);
        const anotherTileIntersects = this.tilesIntersect(start, end);
        if (anotherTileIntersects) this.updateCoordinatesForTilesAndOutputs(tile, start, end); // TODO: check if it's ok
        tile.coordinates.start = start;
        tile.coordinates.end = end;
        return this.actionMap;
    }
    /**
   * Updates the coordinates of all tiles and outputs that intersect with a given tile.
   *
   * This function updates the coordinates of all tiles and outputs that intersect
   * with a given tile. It is used to update the coordinates of a tile when it is
   * dragged to a new location. The function checks if the tile intersects with
   * any other tiles in the action map. If so, it updates the coordinates of the
   * intersecting tiles and any outputs that are connected to them.
   *
   * @param {Tile} tile - The tile that was dragged to a new location.
   * @param {[number, number]} start - The new starting coordinates of the tile.
   * @param {[number, number]} end - The new ending coordinates of the tile.
   */ updateCoordinatesForTilesAndOutputs(tile, start, end) {
        // get difference between old and new coordinates
        const xDiff = start[0] - tile.coordinates.start[0];
        const yDiff = start[1] - tile.coordinates.start[1];
        // get all tiles that are intersect or after the dragged tile
        const tilesToMove = this.actionMap.tiles.filter((t)=>{
            const xStart = t.coordinates.start[0];
            const xEnd = t.coordinates.end[0];
            const yStart = t.coordinates.start[1];
            const yEnd = t.coordinates.end[1];
            return xStart >= start[0] && yStart >= start[1] || xEnd >= start[0] && yEnd >= start[1] || xStart >= start[0] && yEnd >= start[1] || xEnd >= start[0] && yStart >= start[1];
        });
        // move tiles
        tilesToMove.forEach((t)=>{
            t.coordinates.start[0] += xDiff;
            t.coordinates.start[1] += yDiff;
            t.coordinates.end[0] += xDiff;
            t.coordinates.end[1] += yDiff;
        });
        // move outputs
        this.actionMap.outputs.forEach((o)=>{
            const fromTile = this.getSourceTileForOutput(o.id);
            if (tilesToMove.includes(fromTile)) {
                o.coordinates[0] += xDiff;
                o.coordinates[1] += yDiff;
            }
        });
    }
    /**
   * Checks if a tile intersects with any other tile in the action map.
   *
   * This function checks if a tile with the specified start and end coordinates
   * intersects with any other tile in the action map. If an intersection is found,
   * it returns true. Otherwise, it returns false.
   *
   * @param {[number, number]} start - The starting coordinates of the tile to be checked.
   * @param {[number, number]} end - The ending coordinates of the tile to be checked.
   * @returns {boolean} True if the tile intersects with another tile, false otherwise.
   */ tilesIntersect(start, end) {
        const xStart = start[0];
        const xEnd = end[0];
        const yStart = start[1];
        const yEnd = end[1];
        return this.actionMap.tiles.some((t)=>{
            const tXStart = t.coordinates.start[0];
            const tXEnd = t.coordinates.end[0];
            const tYStart = t.coordinates.start[1];
            const tYEnd = t.coordinates.end[1];
            return tXStart >= xStart && tXStart <= xEnd && tYStart >= yStart && tYStart <= yEnd || tXEnd >= xStart && tXEnd <= xEnd && tYEnd >= yStart && tYEnd <= yEnd || tXStart >= xStart && tXStart <= xEnd && tYEnd >= yStart && tYEnd <= yEnd || tXEnd >= xStart && tXEnd <= xEnd && tYStart >= yStart && tYStart <= yEnd;
        });
    }
    /**
   * Asynchronously retrieves the output schema for a given tile.
   *
   * Depending on the type of the tile, this function delegates to a specific
   * method to fetch the corresponding schema. It supports different tile types
   * such as Accessor, Action, and Memory. For unrecognized tile types, it throws
   * an error.
   *
   * @param {Tile} tile - The tile for which to find the output schema.
   * @returns {Promise<DataSchema>} A promise that resolves to the data schema
   *           associated with the tile's output. The specific schema returned
   *           depends on the tile type.
   * @throws {Error} Throws an error if the tile type is invalid or unrecognized.
   */ async getTileOutputSchema(tile) {
        switch(tile.type){
            case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Accessor:
                return this.getAccessorOutputSchema(tile);
            case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Action:
                return this.getActionOutputSchema(tile.actionId);
            case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Memory:
                return this.getMemorySchema(tile.id);
            default:
                throw new Error(`Invalid tile type: ${tile.type}`);
        }
    }
    /**
   * Asynchronously retrieves the schema for the arguments of a specified action.
   *
   * This function fetches the details of the action based on the given action ID.
   * If the action is found, it parses the arguments of the action into a data
   * schema format. If the action is not found, it throws an error.
   *
   * @param {string} actionId - The unique identifier of the action.
   * @returns {Promise<DataSchema>} A promise that resolves to the data schema of
   *           the action's arguments. The schema is parsed from a JSON string.
   * @throws {Error} Throws an error if the action is not found.
   */ async getActionArgumentsSchema(actionId) {
        const action = await this.actionFetcher(actionId);
        if (!action) throw new Error(`Action ${actionId} not found`);
        return JSON.parse(action.arguments);
    }
    /**
   * Asynchronously retrieves all possible outputs for a given tile.
   *
   * This function calculates possible outputs by examining each neighboring tile.
   * For each neighbor, it determines if a connection is possible, the direction 
   * of the output, and the coordinates of the output.
   *
   * @param {Tile} tile - The tile for which to find possible outputs.
   * @returns {Promise<PossibleOutput[]>} A promise that resolves to an array of 
   *           possible outputs. Each output includes coordinates, direction, and 
   *           a boolean indicating if the output is active.
   */ async getTilePossibleOutputs(tile) {
        const neighbors = await this.getTileNeighbors(tile);
        const possibleOutputs = await Promise.all(neighbors.map(async (neighbor)=>{
            const canBeConnected = await this.canConnectTiles(tile.id, neighbor.id, ()=>{});
            const direction = this.getOutputDirection(tile, neighbor);
            const coordinates = this.getOutputCoordinates(tile, neighbor, direction);
            return {
                coordinates: coordinates,
                direction: direction,
                active: canBeConnected
            };
        }));
        return possibleOutputs;
    }
    undo() {
        return this.returnToPreviousState();
    }
    redo() {
        return this.returnToFutureState();
    }
    // PROTECTED -----------------------------------------------------------------
    pushNewState(actionMap) {
        this.clearFutureStack();
        const bsonAM = (0, $hgUW1$BSON).serialize(this.actionMap);
        this.changeStack.push(bsonAM);
        if (this.changeStack.length > 10) this.changeStack.shift();
        this.actionMap = actionMap;
        return actionMap;
    }
    returnToPreviousState() {
        this.putCurrentToFutureState();
        const bsonAM = this.changeStack.pop();
        if (bsonAM) this.actionMap = (0, $hgUW1$BSON).deserialize(bsonAM);
        return this.actionMap;
    }
    putCurrentToFutureState() {
        if (!this.actionMap) return this.actionMap;
        const bsonAM = (0, $hgUW1$BSON).serialize(this.actionMap);
        this.futureStack.push(bsonAM);
        if (this.futureStack.length > 10) this.futureStack.shift();
        return this.actionMap;
    }
    putCurrentToPreviousState() {
        if (!this.actionMap) return this.actionMap;
        const bsonAM = (0, $hgUW1$BSON).serialize(this.actionMap);
        this.changeStack.push(bsonAM);
        if (this.changeStack.length > 10) this.changeStack.shift();
        return this.actionMap;
    }
    clearFutureStack() {
        this.futureStack = [];
        return this.actionMap;
    }
    returnToFutureState() {
        this.putCurrentToPreviousState();
        const bsonAM = this.futureStack.pop();
        if (bsonAM) this.actionMap = (0, $hgUW1$BSON).deserialize(bsonAM);
        return this.actionMap;
    }
    getOutputDirection(tile, neighbor) {
        const xStart = tile.coordinates.start[0];
        const xEnd = tile.coordinates.end[0];
        const yStart = tile.coordinates.start[1];
        const yEnd = tile.coordinates.end[1];
        const neighborXStart = neighbor.coordinates.start[0];
        const neighborXEnd = neighbor.coordinates.end[0];
        const neighborYStart = neighbor.coordinates.start[1];
        const neighborYEnd = neighbor.coordinates.end[1];
        if (neighborXStart === xEnd) return (0, $b224c477343e41e6$export$dec6c71a4257ac74).Right;
        if (neighborXEnd === xStart) return (0, $b224c477343e41e6$export$dec6c71a4257ac74).Left;
        if (neighborYStart === yEnd) return (0, $b224c477343e41e6$export$dec6c71a4257ac74).Down;
        if (neighborYEnd === yStart) return (0, $b224c477343e41e6$export$dec6c71a4257ac74).Up;
        throw new Error("Invalid output direction");
    }
    getOutputCoordinates(tile, neighbor, direction) {
        const neighborXStart = neighbor.coordinates.start[0];
        const neighborXEnd = neighbor.coordinates.end[0];
        const neighborYStart = neighbor.coordinates.start[1];
        const neighborYEnd = neighbor.coordinates.end[1];
        switch(direction){
            case (0, $b224c477343e41e6$export$dec6c71a4257ac74).Down:
                return [
                    neighborXStart,
                    neighborYStart - 1
                ];
            case (0, $b224c477343e41e6$export$dec6c71a4257ac74).Right:
                return [
                    neighborXStart - 1,
                    neighborYStart
                ];
            case (0, $b224c477343e41e6$export$dec6c71a4257ac74).Up:
                return [
                    neighborXStart,
                    neighborYEnd + 1
                ];
            case (0, $b224c477343e41e6$export$dec6c71a4257ac74).Left:
                return [
                    neighborXEnd + 1,
                    neighborYStart
                ];
            default:
                throw new Error("Invalid output direction");
        }
    }
    getTileNeighbors(tile) {
        const neighbors = [];
        // get coordinates of current tile and find any tiles that have
        // coordinates +1 by x right, -1 by x left, +1 by y bottom, -1 by y top
        const xStart = tile.coordinates.start[0];
        const xEnd = tile.coordinates.end[0];
        const yStart = tile.coordinates.start[1];
        const yEnd = tile.coordinates.end[1];
        this.actionMap.tiles.forEach((t)=>{
            if (t.coordinates.start[0] === xEnd && t.coordinates.start[1] >= yStart && t.coordinates.start[1] <= yEnd || t.coordinates.end[0] === xStart && t.coordinates.end[1] >= yStart && t.coordinates.end[1] <= yEnd || t.coordinates.start[1] === yEnd && t.coordinates.start[0] >= xStart && t.coordinates.start[0] <= xEnd || t.coordinates.end[1] === yStart && t.coordinates.end[0] >= xStart && t.coordinates.end[0] <= xEnd) neighbors.push(t);
        });
        return neighbors;
    }
    async getActionOutputSchema(actionId) {
        const action = await this.actionFetcher(actionId);
        if (!action) throw new Error(`Action ${actionId} not found`);
        return JSON.parse(action.output);
    }
    getModelSchema(modelName) {
        const model = this.models.find((m)=>m.name === modelName);
        if (!model) throw new Error(`Model ${modelName} not found`);
        return JSON.parse(model.schema);
    }
    getMemoryById(id) {
        return this.actionMap.tiles.find((tile)=>tile.type === (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Memory && tile.id === id) || null;
    }
    async getMemorySchema(id) {
        // Retrieve a memory object by its ID. Throws an error if not found.
        const memory = this.getMemoryById(id);
        if (!memory) throw new Error(`Memory ${id} not found`);
        // Fetch the outputs associated with the memory's input IDs.
        const inOutputs = this.getOutputsByIds(memory.input);
        // This array will hold the schemas for each input.
        const inputSchemas = await this.processOutputs(inOutputs);
        // If there's only one input schema without an argument, return it directly.
        if (inputSchemas.length === 1 && !inputSchemas[0].argument) return inputSchemas[0].schema;
        // Prepare to construct a combined schema for multiple inputs.
        const properties = {};
        // For each input schema, add a reference to it in the properties of the combined schema.
        inputSchemas.forEach((schema)=>{
            if (schema.argument) properties[schema.argument] = schema.schema;
        });
        // Return the combined schema.
        return {
            type: (0, $8f8d2861b2e1d35f$export$1ae122a9008ff510).Object,
            properties: properties
        };
    }
    /**
   * Asynchronously processes a list of outputs and retrieves their corresponding data schemas.
   * This method maps each output to its source tile and extracts the relevant schema.
   * It also performs validation on the schemas and extracts sub-schemas
   * based on specified output paths.
   *
   * @param {Output[]} inOutputs - An array of outputs to be processed.
   * @returns {Promise<{argument?: string; schema: DataSchema}[]>} A promise that resolves
   * to an array of objects,
   * each containing an optional argument string and a data schema. The 'argument' corresponds
   * to the 'toArgument' property of the output,
   * and 'schema' is the resolved data schema for that output.
   *
   * @throws {Error} If the schema from the source tile is invalid or if the specified outputPath
   * does not exist in the tile's schema.
   *
   * Each output is processed as follows:
   * 1. For each output, its source tile is identified.
   * 2. The schema associated with the source tile's output is retrieved.
   * 3. If an outputPath is specified for the output, the schema for that specific path
   * is extracted and validated.
   *    If the outputPath is not valid, an error is thrown.
   * 4. If no outputPath is specified, the entire schema from the source tile is used.
   * 5. The resulting schema and any argument are added to the return array.
   */ async processOutputs(inOutputs) {
        const inputSchemas = await Promise.all(inOutputs.map(async (output)=>{
            const sourceTile = this.getSourceTileForOutput(output.id);
            // Refactored schema retrieval into a separate function for clarity
            const sourceTileOutputSchema = await this.getTileOutputSchema(sourceTile);
            let outputSchema;
            if (output.outputPath) {
                if (!this.dataSchemaHandler.validateSchema(sourceTileOutputSchema)) throw new Error(`Invalid schema for tile ${sourceTile.id}`);
                outputSchema = this.dataSchemaHandler.getSchemaFromPath(sourceTileOutputSchema, output.outputPath);
                if (!this.dataSchemaHandler.validateSchema(outputSchema)) throw new Error(`Output field ${output.outputPath} not found in tile ${sourceTile.id}`);
            } else outputSchema = sourceTileOutputSchema;
            return {
                argument: output.toArgument,
                schema: outputSchema
            };
        }));
        return inputSchemas;
    }
    getOutputById(id) {
        const output = this.actionMap.outputs.find((o)=>o.id === id);
        if (!output) throw new Error(`Output ${id} not found`);
        return output;
    }
    getOutputsByIds(ids) {
        return ids.map((id)=>this.getOutputById(id));
    }
    getSourceTileForOutput(outputId) {
        const tile = this.actionMap.tiles.find((t)=>{
            switch(t.type){
                case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Accessor:
                    return t.output.includes(outputId);
                case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Action:
                    return t.output.includes(outputId);
                case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Memory:
                    return false;
                default:
                    throw new Error(`Invalid tile type: ${t.type}`);
            }
        });
        if (!tile) throw new Error(`Tile for output ${outputId} not found`);
        return tile;
    }
}







export {$b224c477343e41e6$export$b58a0cc33096f1fb as TileType, $b224c477343e41e6$export$be94d7b677b041dd as OutputType, $b224c477343e41e6$export$dec6c71a4257ac74 as OutputDirection, $b224c477343e41e6$export$e035c9caa79ccaa9 as ConditionOperator, $b224c477343e41e6$export$a82221618652cb9f as CONSTANT_SELECTOR, $b224c477343e41e6$export$ede5a19a386fa7ea as MEMORY_SELECTOR, $b224c477343e41e6$export$85ca6aa0f7ebde22 as MODEL_SELECTOR, $b224c477343e41e6$export$bf648471fa87db4a as OUTPUT_SELECTOR, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c as SimpleDataType, $8f8d2861b2e1d35f$export$a914443d1add2f4c as FormatDataType, $54eb9ffd392831bf$export$a82bfd0bc6a25e39 as ActionMapHandler, $a3e7ad90fc86cc8c$export$e073683b1b98b026 as DataSchemaHandler, $8f8d2861b2e1d35f$export$1ae122a9008ff510 as ComplexDataType, $8f8d2861b2e1d35f$export$b00b62a09b73016e as ContentDataType, $b224c477343e41e6$export$1f02415756f5fb16 as AccessorType, $b224c477343e41e6$export$90d94503f4d956ff as MemoryType};
//# sourceMappingURL=module.js.map
