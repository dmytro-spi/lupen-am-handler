"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelMemoryOperation = exports.MemoryType = exports.ModelAccessOperation = exports.AccessorType = exports.TileType = exports.OutputType = exports.OutputDirection = exports.ConditionOperator = exports.OUTPUT_SELECTOR = exports.MODEL_SELECTOR = exports.CONSTANT_SELECTOR = exports.MEMORY_SELECTOR = void 0;
const MEMORY_SELECTOR = (id) => `memory::${id}`;
exports.MEMORY_SELECTOR = MEMORY_SELECTOR;
const CONSTANT_SELECTOR = (name) => `constant::${name}`;
exports.CONSTANT_SELECTOR = CONSTANT_SELECTOR;
const MODEL_SELECTOR = (name) => `model::${name}`;
exports.MODEL_SELECTOR = MODEL_SELECTOR;
const OUTPUT_SELECTOR = (id) => `output::${id}`;
exports.OUTPUT_SELECTOR = OUTPUT_SELECTOR;
var ConditionOperator;
(function (ConditionOperator) {
    ConditionOperator["Equal"] = "==";
    ConditionOperator["StrongEqual"] = "===";
    ConditionOperator["NotEqual"] = "!=";
    ConditionOperator["StrongNotEqual"] = "!==";
    ConditionOperator["GreaterThan"] = ">";
    ConditionOperator["GreaterThanOrEqual"] = ">=";
    ConditionOperator["LessThan"] = "<";
    ConditionOperator["LessThanOrEqual"] = "<=";
})(ConditionOperator || (exports.ConditionOperator = ConditionOperator = {}));
var OutputDirection;
(function (OutputDirection) {
    OutputDirection["Down"] = "down";
    OutputDirection["Right"] = "right";
    OutputDirection["Up"] = "up";
    OutputDirection["Left"] = "left";
})(OutputDirection || (exports.OutputDirection = OutputDirection = {}));
var OutputType;
(function (OutputType) {
    OutputType["Default"] = "default";
    OutputType["Conditional"] = "conditional";
    OutputType["ForEach"] = "forEach";
})(OutputType || (exports.OutputType = OutputType = {}));
var TileType;
(function (TileType) {
    TileType["Accessor"] = "accessor";
    TileType["Action"] = "action";
    TileType["Memory"] = "memory";
})(TileType || (exports.TileType = TileType = {}));
var AccessorType;
(function (AccessorType) {
    AccessorType["Model"] = "model";
    AccessorType["Constant"] = "constant";
    AccessorType["Memory"] = "memory";
    AccessorType["DataIn"] = "dataIn";
})(AccessorType || (exports.AccessorType = AccessorType = {}));
var ModelAccessOperation;
(function (ModelAccessOperation) {
    ModelAccessOperation["FindOne"] = "findOne";
    ModelAccessOperation["FindMany"] = "findMany";
    ModelAccessOperation["FindFirst"] = "findFirst";
    ModelAccessOperation["FindLast"] = "findLast";
})(ModelAccessOperation || (exports.ModelAccessOperation = ModelAccessOperation = {}));
;
var MemoryType;
(function (MemoryType) {
    MemoryType["DataOut"] = "dataOut";
    MemoryType["Internal"] = "internal";
    MemoryType["Model"] = "model";
})(MemoryType || (exports.MemoryType = MemoryType = {}));
var ModelMemoryOperation;
(function (ModelMemoryOperation) {
    ModelMemoryOperation["Create"] = "create";
    ModelMemoryOperation["Update"] = "update";
    ModelMemoryOperation["Delete"] = "delete";
})(ModelMemoryOperation || (exports.ModelMemoryOperation = ModelMemoryOperation = {}));
;
