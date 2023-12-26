"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
const output_schema_1 = require("./output.schema");
const tile_schema_1 = require("./tile.schema");
const actionMapSchema = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    outputs: yup.array().of(output_schema_1.default).required(),
    tiles: yup.array().of(tile_schema_1.default).required(),
});
exports.default = actionMapSchema;
