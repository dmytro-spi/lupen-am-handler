"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessorSources = exports.TileType = exports.OutputType = exports.OutputDirection = exports.ConditionOperator = exports.OUTPUT_SELECTOR = exports.MODEL_SELECTOR = exports.CONSTANT_SELECTOR = exports.MEMORY_SELECTOR = void 0;
// User language types ---------------------------------------------------------
const MEMORY_SELECTOR = (id) => `memory::${id}`;
exports.MEMORY_SELECTOR = MEMORY_SELECTOR;
const CONSTANT_SELECTOR = (name) => `constant::${name}`;
exports.CONSTANT_SELECTOR = CONSTANT_SELECTOR;
const MODEL_SELECTOR = (name) => `model::${name}`;
exports.MODEL_SELECTOR = MODEL_SELECTOR;
const OUTPUT_SELECTOR = (id) => `output::${id}`;
exports.OUTPUT_SELECTOR = OUTPUT_SELECTOR;
// condition operators
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
// Output types ----------------------------------------------------------------
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
// Tile types ------------------------------------------------------------------
var TileType;
(function (TileType) {
    TileType["Accessor"] = "accessor";
    TileType["Action"] = "action";
    TileType["Memory"] = "memory";
})(TileType || (exports.TileType = TileType = {}));
var AccessorSources;
(function (AccessorSources) {
    AccessorSources["Model"] = "model";
    AccessorSources["Constant"] = "constant";
    AccessorSources["Memory"] = "memory";
    AccessorSources["Input"] = "input";
})(AccessorSources || (exports.AccessorSources = AccessorSources = {}));
