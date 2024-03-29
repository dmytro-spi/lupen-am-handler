import {v4 as $hgUW1$v4} from "uuid";
import {encode as $hgUW1$encode, decode as $hgUW1$decode} from "@msgpack/msgpack";
import {object as $hgUW1$object, string as $hgUW1$string, array as $hgUW1$array, mixed as $hgUW1$mixed, lazy as $hgUW1$lazy, boolean as $hgUW1$boolean, number as $hgUW1$number} from "yup";
import {cloneDeep as $hgUW1$cloneDeep} from "lodash";


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
var $8f8d2861b2e1d35f$export$485ee20ccac73046;
(function(SpecialDataType) {
    SpecialDataType["Any"] = "any";
})($8f8d2861b2e1d35f$export$485ee20ccac73046 || ($8f8d2861b2e1d35f$export$485ee20ccac73046 = {}));
var $8f8d2861b2e1d35f$export$4587e7df7bf7da4;
(function(CompatibilitySide) {
    CompatibilitySide["Source"] = "source";
    CompatibilitySide["Target"] = "target";
})($8f8d2861b2e1d35f$export$4587e7df7bf7da4 || ($8f8d2861b2e1d35f$export$4587e7df7bf7da4 = {}));
var $8f8d2861b2e1d35f$export$f254a14107c93b29;
(function(SchemasCompatibilityTypes) {
    SchemasCompatibilityTypes["Direct"] = "direct";
    SchemasCompatibilityTypes["Conditional"] = "conditional";
    SchemasCompatibilityTypes["ArrayItem"] = "arrayItem";
})($8f8d2861b2e1d35f$export$f254a14107c93b29 || ($8f8d2861b2e1d35f$export$f254a14107c93b29 = {}));



const $bdd949795ffeb68f$export$2c76aca27257bcfa = [
    {
        id: (0, $hgUW1$v4)(),
        name: "string",
        label: "String"
    },
    {
        id: (0, $hgUW1$v4)(),
        name: "array",
        label: "Array"
    },
    {
        id: (0, $hgUW1$v4)(),
        name: "object",
        label: "Object"
    },
    {
        id: (0, $hgUW1$v4)(),
        name: "math",
        label: "Math"
    },
    {
        id: (0, $hgUW1$v4)(),
        name: "date",
        label: "Date"
    },
    {
        id: (0, $hgUW1$v4)(),
        name: "url",
        label: "URL"
    },
    {
        id: (0, $hgUW1$v4)(),
        name: "json",
        label: "JSON"
    },
    {
        id: (0, $hgUW1$v4)(),
        name: "utility",
        label: "Utility"
    }
];


const $24eeb2528eee365c$export$4b297bc2fa8c669c = {
    type: (0, $8f8d2861b2e1d35f$export$1ae122a9008ff510).Object,
    properties: {
        strings: {
            type: (0, $8f8d2861b2e1d35f$export$1ae122a9008ff510).Array,
            description: "An array of strings to be concatenated.",
            arrayType: {
                type: (0, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c).Text
            },
            required: true
        },
        divider: {
            type: (0, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c).Text,
            description: "The divider to be used between strings. Default is a space.",
            defaultValue: " "
        }
    }
};
const $24eeb2528eee365c$export$6d59db4903f20f7d = `
Concatenates an array of strings into a single string.
`;
const $24eeb2528eee365c$export$92ebad0065552617 = `
const concat = (strings, divider = ' ') => {
  const validate = ajv.compile($actionArguments$);
  const valid = validate({ strings, divider });

  if (!valid) {
    throw new Error(\`Invalid arguments for action $actionName$: \${ajv.errorsText(validate.errors)}\`);
  }

  return strings.join(divider);
}
`;
const $24eeb2528eee365c$export$85c8af99bbe9dd50 = `
const $variable$ = concat($strings$, $divider$);
`;
const $24eeb2528eee365c$export$7955756ec726d219 = {
    type: (0, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c).Text
};
const $24eeb2528eee365c$export$9b31c90f56636e45 = {
    id: (0, $hgUW1$v4)(),
    category: (0, $bdd949795ffeb68f$export$2c76aca27257bcfa).find((category)=>category.name === "string")?.id || "",
    name: "combine",
    label: "Combine",
    arguments: JSON.stringify($24eeb2528eee365c$export$4b297bc2fa8c669c),
    description: $24eeb2528eee365c$export$6d59db4903f20f7d.trim(),
    implementation: $24eeb2528eee365c$export$92ebad0065552617.trim(),
    functionCall: $24eeb2528eee365c$export$85c8af99bbe9dd50.trim(),
    output: JSON.stringify($24eeb2528eee365c$export$7955756ec726d219)
};




const $fd42a2123675ef71$export$431bbfaa07941dc7 = {
    type: (0, $8f8d2861b2e1d35f$export$1ae122a9008ff510).Object,
    properties: {
        email: {
            type: (0, $8f8d2861b2e1d35f$export$a914443d1add2f4c).Email
        },
        firstName: {
            type: (0, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c).Text
        },
        lastName: {
            type: (0, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c).Text
        },
        dateOfBirth: {
            type: (0, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c).Date
        }
    }
};
const $fd42a2123675ef71$export$54582e7b17f0fab7 = {
    id: (0, $hgUW1$v4)(),
    name: "user",
    schema: JSON.stringify($fd42a2123675ef71$export$431bbfaa07941dc7)
};




var $b224c477343e41e6$export$d95e7684b6658cc2;
(function(SourceType) {
    SourceType["Constant"] = "constant";
    SourceType["Memory"] = "memory";
    SourceType["Model"] = "model";
    SourceType["Input"] = "input";
})($b224c477343e41e6$export$d95e7684b6658cc2 || ($b224c477343e41e6$export$d95e7684b6658cc2 = {}));
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
    ConditionOperator["Not"] = "!";
})($b224c477343e41e6$export$e035c9caa79ccaa9 || ($b224c477343e41e6$export$e035c9caa79ccaa9 = {}));
var $b224c477343e41e6$export$e1de7239b7c0d20c;
(function(LogicalOperator) {
    LogicalOperator["And"] = "&&";
    LogicalOperator["Or"] = "||";
})($b224c477343e41e6$export$e1de7239b7c0d20c || ($b224c477343e41e6$export$e1de7239b7c0d20c = {}));
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
// const outputDirectionSchema = yup
//   .mixed<OutputDirection>()
//   .oneOf(Object.values(OutputDirection));
// OutputType schema
const $0c1e32e0c308ab33$var$outputTypeSchema = $hgUW1$mixed().oneOf(Object.values((0, $b224c477343e41e6$export$be94d7b677b041dd)));
// Base OutputGeneral schema
const $0c1e32e0c308ab33$var$outputGeneralSchema = $hgUW1$object().shape({
    id: $hgUW1$string().required(),
    // direction: outputDirectionSchema.required(),
    // coordinates: yup
    //   .array()
    //   .of(yup.number())
    //   .min(2)
    //   .max(2)
    //   .required(),
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
    coordinates: $hgUW1$array().of($hgUW1$number()).min(2).max(2).required(),
    type: $8e667be3765ae363$export$3f22e65960887329.required()
});
const $8e667be3765ae363$export$8df29c7063b7517d = $8e667be3765ae363$export$8da21ffd331f2922.concat($hgUW1$object({
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
    // query: yup.string().required(),
    operation: $8e667be3765ae363$export$923e425a87884b8a.required()
}));
const $8e667be3765ae363$export$c9c64d51056635a7 = $8e667be3765ae363$export$8da21ffd331f2922.concat($hgUW1$object({
    output: $hgUW1$array().of($hgUW1$string()).required(),
    actionId: $hgUW1$string().required(),
    input: $hgUW1$array().of($hgUW1$string()).required()
}));
const $8e667be3765ae363$export$48e226a6daf86e70 = $8e667be3765ae363$export$8da21ffd331f2922.concat($hgUW1$object({
    memoryType: $hgUW1$mixed().oneOf(Object.values((0, $b224c477343e41e6$export$90d94503f4d956ff))).required()
}));
const $8e667be3765ae363$export$1253cb500ffddf18 = $8e667be3765ae363$export$48e226a6daf86e70.concat($hgUW1$object({
    memoryType: $hgUW1$mixed().oneOf([
        (0, $b224c477343e41e6$export$90d94503f4d956ff).Model
    ]),
    modelName: $hgUW1$string().required(),
    // query: yup.string().required(),
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






const $c9d6d96cde509fa7$var$pathValidateAndFormat = (path, chainLength)=>{
    if (!path) return "";
    const symbols = path.match(/[^\.a-zA-Z0-9\[\]]/g);
    if (symbols) throw new Error(`Invalid symbols in path: ${path}`);
    if (path[0] === ".") return path.slice(1);
    if (chainLength && path.split(".").length !== chainLength) throw new Error(`Invalid path length: ${path}`);
    return path;
};
var $c9d6d96cde509fa7$export$2e2bcd8739ae039 = $c9d6d96cde509fa7$var$pathValidateAndFormat;


class $a3e7ad90fc86cc8c$export$e073683b1b98b026 {
    // public getPropertiesTree(schema: DataSchema): PropertyTree {
    //   return this.getPropertiesTreeFromSchema(schema);
    // }
    isSchemasCompatible(schema, schemaToCompare) {
        return this.isSchemasCompatibleRecursive(schema, schemaToCompare);
    }
    findCompatibilities(source, target, cb) {
        if (!this.validateSchema(source) || !this.validateSchema(target)) throw new Error("Invalid schemas");
        const someCompatible = false;
        const sourceC = (0, $hgUW1$cloneDeep)(source);
        const targetC = (0, $hgUW1$cloneDeep)(target);
        const sourceDataSchemas = [];
        const targetDataSchemas = Object.values(targetC.properties || {});
        this.walkThroughPropertiesRecursive(sourceC, (partialSchema)=>{
            sourceDataSchemas.push(partialSchema);
        });
        for (const sourceSchema of sourceDataSchemas)for (const targetSchema of targetDataSchemas){
            if (this.isSchemasCompatibleRecursive({
                ...sourceSchema,
                required: true
            }, targetSchema)) {
                sourceSchema.compatibility = sourceSchema.compatibility || [];
                targetSchema.compatibility = targetSchema.compatibility || [];
                const uuid = (0, $hgUW1$v4)();
                const type = !sourceSchema.required && targetSchema.required ? (0, $8f8d2861b2e1d35f$export$f254a14107c93b29).Conditional : (0, $8f8d2861b2e1d35f$export$f254a14107c93b29).Direct;
                sourceSchema.compatibility.push({
                    id: uuid,
                    side: (0, $8f8d2861b2e1d35f$export$4587e7df7bf7da4).Source,
                    type: type
                });
                targetSchema.compatibility.push({
                    id: uuid,
                    side: (0, $8f8d2861b2e1d35f$export$4587e7df7bf7da4).Target,
                    type: type
                });
            }
            if (sourceSchema.type === (0, $8f8d2861b2e1d35f$export$1ae122a9008ff510).Array && this.isSchemasCompatibleRecursive(sourceSchema.arrayType, targetSchema)) {
                sourceSchema.compatibility = sourceSchema.compatibility || [];
                targetSchema.compatibility = targetSchema.compatibility || [];
                const uuid = (0, $hgUW1$v4)();
                sourceSchema.compatibility.push({
                    id: uuid,
                    side: (0, $8f8d2861b2e1d35f$export$4587e7df7bf7da4).Source,
                    type: (0, $8f8d2861b2e1d35f$export$f254a14107c93b29).ArrayItem
                });
                targetSchema.compatibility.push({
                    id: uuid,
                    side: (0, $8f8d2861b2e1d35f$export$4587e7df7bf7da4).Target,
                    type: (0, $8f8d2861b2e1d35f$export$f254a14107c93b29).ArrayItem
                });
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
            case (0, $8f8d2861b2e1d35f$export$485ee20ccac73046).Any:
                callback(schema);
                break;
            case (0, $8f8d2861b2e1d35f$export$1ae122a9008ff510).Object:
                Object.entries(schema.properties || {}).forEach(([key, value])=>{
                    this.walkThroughPropertiesRecursive(value, (partialSchema)=>{
                        callback(partialSchema);
                    });
                });
                break;
            case (0, $8f8d2861b2e1d35f$export$1ae122a9008ff510).Array:
                this.walkThroughPropertiesRecursive(schema.arrayType, (dSchema)=>{
                    callback(dSchema);
                });
                break;
            default:
                throw new Error(`Unsupported data type: ${schema.type}`);
        }
    }
    getSchemaFromPath(schema, path) {
        const pathParts = (0, $c9d6d96cde509fa7$export$2e2bcd8739ae039)(path).replace(/[\[\]\d]/g, "").split(".").filter((part)=>part !== "");
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
                return schemaFrom.required === schemaTo.required || !schemaTo.required;
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
}



class $54eb9ffd392831bf$export$a82bfd0bc6a25e39 {
    constructor(actionMap, models, options){
        this.models = models;
        this.dataSchemaHandler = new (0, $a3e7ad90fc86cc8c$export$e073683b1b98b026)();
        this.actionMap = $54eb9ffd392831bf$export$a82bfd0bc6a25e39.emptyActionMap;
        this.usedActions = [];
        this.undoStack = [];
        this.redoStack = [];
        this.firstTileY = 0;
        this.lastTileY = 0;
        this.firstTileX = 0;
        this.lastTileX = 0;
        if (actionMap) {
            this.actionMap = actionMap;
            if (!options?.skipValidation) {
                const { isValid: isValid } = this.validateSchema();
                if (!isValid) throw new Error("Invalid action map schema");
            }
            this.refreshFirstAndLastTileCoordinates();
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
    forceUpdateActionMap(actionMap) {
        this.actionMap = actionMap;
        return this.actionMap;
    }
    // TODO: implement!
    isTileNeedsForInputs(tileId) {
        throw new Error("Not implemented");
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
        this.saveUndo();
        this.actionMap = {
            id: (0, $hgUW1$v4)(),
            name: name ?? "New Action Map",
            tiles: [],
            outputs: []
        };
        this.refreshFirstAndLastTileCoordinates();
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
   */ validateSchema() {
        try {
            (0, $65496cb9dfa51acd$export$2e2bcd8739ae039).validateSync(this.actionMap, {
                abortEarly: false
            });
            return {
                isValid: true,
                errors: []
            };
        } catch (e) {
            return {
                isValid: false,
                errors: e.errors
            };
        }
    }
    /**
   * Retrieves the output schema for an Accessor tile.
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
   */ getAccessorOutputSchema(tile) {
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
                return tile.dataInProps.type;
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
   */ validateTile(tile) {
        if (this.tilesIntersect(tile.coordinates)) throw new Error("Tile has intersections");
        switch(tile.type){
            case (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Accessor:
                (0, $8e667be3765ae363$export$8df29c7063b7517d).validate(tile, {
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
   */ addTile(tile, actionSchemas) {
        this.validateTile(tile);
        // check action schemas and cache them
        if (tile.type === (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Action) {
            if (!actionSchemas) throw new Error("Action schemas are not provided");
            if (tile.actionId !== actionSchemas.actionId) throw new Error("Action schemas are not for this action");
            if (!this.usedActions.some((usedAction)=>usedAction.actionId === actionSchemas.actionId)) this.usedActions.push(actionSchemas);
        }
        this.saveUndo();
        this.actionMap.tiles.push(tile);
        if (tile.coordinates[0] < this.firstTileX) this.firstTileX = tile.coordinates[0];
        if (tile.coordinates[0] > this.lastTileX) this.lastTileX = tile.coordinates[0];
        if (tile.coordinates[1] < this.firstTileY) this.firstTileY = tile.coordinates[1];
        if (tile.coordinates[1] > this.lastTileY) this.lastTileY = tile.coordinates[1];
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
        const tile = this.actionMap.tiles.find((t)=>t.id === id);
        if (!tile) throw new Error(`Tile ${id} not found`);
        this.saveUndo();
        // delete inputs ant outputs for this tile
        const newOutputs = this.actionMap.outputs.filter((o)=>o.outputTileId !== id && o.inputTileId !== id);
        this.actionMap.tiles = this.actionMap.tiles.filter((t)=>t.id !== id);
        this.actionMap.outputs = newOutputs;
        if (tile.coordinates[0] === this.firstTileX) this.firstTileX = this.actionMap.tiles.reduce((acc, t)=>Math.min(acc, t.coordinates[0]), 0);
        if (tile.coordinates[0] === this.lastTileX) this.lastTileX = this.actionMap.tiles.reduce((acc, t)=>Math.max(acc, t.coordinates[0]), 0);
        if (tile.coordinates[1] === this.firstTileY) this.firstTileY = this.actionMap.tiles.reduce((acc, t)=>Math.min(acc, t.coordinates[1]), 0);
        if (tile.coordinates[1] === this.lastTileY) this.lastTileY = this.actionMap.tiles.reduce((acc, t)=>Math.max(acc, t.coordinates[1]), 0);
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
   */ canConnectTiles(fromTileId, toTileId, cb) {
        const fromTile = this.actionMap.tiles.find((t)=>t.id === fromTileId);
        const toTile = this.actionMap.tiles.find((t)=>t.id === toTileId);
        let toSchema = null;
        if (toTile?.type === (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Memory) toSchema = this.getMemorySchema(toTile.id);
        if (toTile?.type === (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Action) toSchema = this.getActionArgumentsSchema(toTile.actionId);
        if (!toSchema) return false;
        const fromSchema = this.getTileOutputSchema(fromTile);
        return this.dataSchemaHandler.findCompatibilities(fromSchema, toSchema, (source, target)=>cb({
                from: source,
                to: target
            }));
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
   */ addOutput(output) {
        // TODO: Add output validation
        const fromTile = this.actionMap.tiles.find((t)=>t.id === output.outputTileId);
        if (!fromTile) throw new Error(`Tile ${output.outputTileId} not found`);
        const toTile = this.actionMap.tiles.find((t)=>t.id === output.inputTileId);
        if (!toTile) throw new Error(`Tile ${output.inputTileId} not found`);
        // TODO: enable this
        let compatiblePaths;
        // if (
        //   !this.canConnectTiles(output.outputTileId, output.inputTileId, (paths) => {
        //     compatiblePaths = paths;
        //   })
        // ) {
        //   throw new Error(`Tiles ${output.outputTileId} and ${output.inputTileId} are not compatible`);
        // }
        // TODO: reimplement this
        // if (!output.dataMap.every((dataMap) => compatiblePaths.some((path) => path.from === dataMap.outputPath && path.to === dataMap.inputPath))) {
        //   throw new Error('Output data map is not compatible with tiles');
        // }
        this.saveUndo();
        const outputId = (0, $hgUW1$v4)();
        this.actionMap.outputs.push({
            ...output,
            id: outputId
        });
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
   */ // public removeOutput(id: string): ActionMap {
    //   const index = this.actionMap.outputs.findIndex((o: Output) => o.id === id);
    //   if (index === -1) {
    //     throw new Error(`Output ${id} not found`);
    //   }
    //   this.actionMap.outputs.splice(index, 1);
    //   // remove output from tiles
    //   this.actionMap.tiles = this.actionMap.tiles.map((tile: Tile) => {
    //     const tileCopy = { ...tile };
    //     switch (tile.type) {
    //       case TileType.Accessor:
    //         (tileCopy as AccessorTile).output = (
    //           tile as AccessorTile
    //         ).output.filter((outputId: string) => outputId !== id);
    //         break;
    //       case TileType.Action:
    //         (tileCopy as ActionTile).input = (tile as ActionTile).input.filter(
    //           (outputId: string) => outputId !== id,
    //         );
    //         (tileCopy as ActionTile).output = (tile as ActionTile).output.filter(
    //           (outputId: string) => outputId !== id,
    //         );
    //         break;
    //       case TileType.Memory:
    //         (tileCopy as MemoryTile).input = (tile as MemoryTile).input.filter(
    //           (outputId: string) => outputId !== id,
    //         );
    //         break;
    //       default:
    //         throw new Error(`Invalid tile type: ${tile.type}`);
    //     }
    //     return tile;
    //   });
    //   return this.actionMap;
    // }
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
   */ updateTileCoordinates(id, position) {
        const tile = this.actionMap.tiles.find((t)=>t.id === id);
        if (!tile) throw new Error(`Tile ${id} not found`);
        const anotherTileIntersects = this.tilesIntersect(position);
        if (anotherTileIntersects) throw new Error("Tile intersects with another tile");
        this.saveUndo();
        tile.coordinates = position;
        return this.actionMap;
    }
    /**
   * Checks if a tile intersects with any other tile in the action map.
   *
   * This function checks if a tile with the specified start and end coordinates
   * intersects with any other tile in the action map. If an intersection is found,
   * it returns true. Otherwise, it returns false.
   *
   * @param {[number, number]} position - The coordinates of the tile to be checked.
   * @returns {boolean} True if the tile intersects with another tile, false otherwise.
   */ tilesIntersect(position) {
        return Boolean(this.actionMap.tiles.find((t)=>t.coordinates[0] === position[0] && t.coordinates[1] === position[1]));
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
   */ getTileOutputSchema(tile) {
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
   */ getActionArgumentsSchema(actionId) {
        const action = this.usedActions.find((a)=>a.actionId === actionId);
        if (!action) throw new Error(`Action ${actionId} not found`);
        return action.arguments;
    }
    undo() {
        return this.undoChanges();
    }
    redo() {
        return this.redoChanges();
    }
    getTileOutputs(tileId) {
        return this.actionMap.outputs.filter((o)=>o.outputTileId === tileId);
    }
    getTileInputs(tileId) {
        return this.actionMap.outputs.filter((o)=>o.inputTileId === tileId);
    }
    getFirstLastTileCoordinates() {
        return {
            firstTileX: this.firstTileX,
            lastTileX: this.lastTileX,
            firstTileY: this.firstTileY,
            lastTileY: this.lastTileY
        };
    }
    // PROTECTED -----------------------------------------------------------------
    refreshFirstAndLastTileCoordinates() {
        this.firstTileX = this.actionMap.tiles.reduce((acc, t)=>Math.min(acc, t.coordinates[0]), 0);
        this.lastTileX = this.actionMap.tiles.reduce((acc, t)=>Math.max(acc, t.coordinates[0]), 0);
        this.firstTileY = this.actionMap.tiles.reduce((acc, t)=>Math.min(acc, t.coordinates[1]), 0);
        this.lastTileY = this.actionMap.tiles.reduce((acc, t)=>Math.max(acc, t.coordinates[1]), 0);
    }
    getMemoryInitialSchema(tileId) {
        const memory = this.getMemoryById(tileId);
        if (!memory) throw new Error(`Memory ${tileId} not found`);
        if (memory.memoryType === (0, $b224c477343e41e6$export$90d94503f4d956ff).Model) return this.getModelSchema(memory.modelName);
        const initialMemorySchema = {
            type: (0, $8f8d2861b2e1d35f$export$1ae122a9008ff510).Object,
            properties: memory.properties.reduce((acc, prop)=>{
                acc[prop] = {
                    type: (0, $8f8d2861b2e1d35f$export$485ee20ccac73046).Any,
                    required: true
                };
                return acc;
            }, {}),
            required: true
        };
        return initialMemorySchema;
    }
    saveUndo() {
        const actionMapBuffer = (0, $hgUW1$encode)(this.actionMap);
        this.undoStack.push(actionMapBuffer);
    }
    undoChanges() {
        const previousActionMapBuffer = this.undoStack.pop();
        if (!previousActionMapBuffer) return this.actionMap;
        const currentActionMapBuffer = (0, $hgUW1$encode)(this.actionMap);
        this.redoStack.push(currentActionMapBuffer);
        this.actionMap = (0, $hgUW1$decode)(previousActionMapBuffer);
        return this.actionMap;
    }
    redoChanges() {
        const futureActionMapBuffer = this.redoStack.pop();
        if (!futureActionMapBuffer) return this.actionMap;
        const currentActionMapBuffer = (0, $hgUW1$encode)(this.actionMap);
        this.undoStack.push(currentActionMapBuffer);
        this.actionMap = (0, $hgUW1$decode)(futureActionMapBuffer);
        return this.actionMap;
    }
    getActionOutputSchema(actionId) {
        const action = this.usedActions.find((a)=>a.actionId === actionId);
        if (!action) throw new Error(`Action ${actionId} not found`);
        return action.output;
    }
    getModelSchema(modelName) {
        const model = this.models.find((m)=>m.name === modelName);
        if (!model) throw new Error(`Model ${modelName} not found`);
        return JSON.parse(model.schema);
    }
    getMemoryById(id) {
        return this.actionMap.tiles.find((tile)=>tile.type === (0, $b224c477343e41e6$export$b58a0cc33096f1fb).Memory && tile.id === id) || null;
    }
    getMemorySchema(id) {
        // Retrieve a memory object by its ID. Throws an error if not found.
        const memory = this.getMemoryById(id);
        if (!memory) throw new Error(`Memory ${id} not found`);
        // Fetch the outputs associated with the memory's input IDs.
        const inOutputs = this.getOutputsByOutputTileId(memory.id);
        return this.outputsToDataSchema(inOutputs);
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
   */ outputsToDataSchema(inOutputs) {
        const dataSchema = {
            type: (0, $8f8d2861b2e1d35f$export$1ae122a9008ff510).Object,
            properties: {},
            required: true
        };
        inOutputs.forEach((output)=>{
            const sourceTile = this.getSourceTileForOutput(output.id);
            const sourceTileOutputSchema = this.getTileOutputSchema(sourceTile);
            output.dataMap.forEach((dataMap)=>{
                const outputSchema = this.dataSchemaHandler.getSchemaFromPath(sourceTileOutputSchema, dataMap.outputPath);
                if (!this.dataSchemaHandler.validateSchema(outputSchema)) throw new Error(`Output field ${dataMap.outputPath} not found in tile ${sourceTile.id}`);
                dataSchema.properties[dataMap.inputPath] = outputSchema;
            });
        });
        return dataSchema;
    }
    getOutputById(id) {
        const output = this.actionMap.outputs.find((o)=>o.id === id);
        if (!output) throw new Error(`Output ${id} not found`);
        return output;
    }
    getOutputsByIds(ids) {
        return this.actionMap.outputs.filter((o)=>ids.includes(o.id));
    }
    getOutputsByOutputTileId(id) {
        return this.actionMap.outputs.filter((o)=>o.outputTileId === id);
    }
    getSourceTileForOutput(outputId) {
        const output = this.actionMap.outputs.find((o)=>o.id === outputId);
        if (!output) throw new Error(`Output ${outputId} not found`);
        const tile = this.actionMap.tiles.find((t)=>t.id === output?.outputTileId);
        if (!tile) throw new Error(`Tile for output ${outputId} not found`);
        return tile;
    }
}







export {$b224c477343e41e6$export$b58a0cc33096f1fb as TileType, $b224c477343e41e6$export$be94d7b677b041dd as OutputType, $b224c477343e41e6$export$e035c9caa79ccaa9 as ConditionOperator, $8f8d2861b2e1d35f$export$2bd38b90f09fb16c as SimpleDataType, $8f8d2861b2e1d35f$export$a914443d1add2f4c as FormatDataType, $54eb9ffd392831bf$export$a82bfd0bc6a25e39 as ActionMapHandler, $a3e7ad90fc86cc8c$export$e073683b1b98b026 as DataSchemaHandler, $8f8d2861b2e1d35f$export$1ae122a9008ff510 as ComplexDataType, $8f8d2861b2e1d35f$export$b00b62a09b73016e as ContentDataType, $b224c477343e41e6$export$1f02415756f5fb16 as AccessorType, $b224c477343e41e6$export$90d94503f4d956ff as MemoryType, $fd42a2123675ef71$export$54582e7b17f0fab7 as UserModel, $24eeb2528eee365c$export$9b31c90f56636e45 as CombineAction, $b224c477343e41e6$export$5c1a605137b9ecb3 as ModelAccessOperation};
//# sourceMappingURL=module.js.map
