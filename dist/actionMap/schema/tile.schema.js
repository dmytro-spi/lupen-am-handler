"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelMemoryTileSchema = exports.memoryTileSchema = exports.actionTileSchema = exports.modelAccessorTileSchema = exports.memoryAccessorTileSchema = exports.dataInAccessorTileSchema = exports.constantAccessorTileSchema = exports.accessorTileSchema = exports.tileGeneralSchema = exports.modelMemoryOperationSchema = exports.modelAccessOperationSchema = exports.accessorTypeSchema = exports.tileTypeSchema = exports.dataInSchema = void 0;
const yup = require("yup");
const actionMap_1 = require("../types/actionMap");
const dataSchema_schema_1 = require("../../dataSchema/schema/dataSchema.schema");
exports.dataInSchema = yup.object().shape({
    name: yup.string().required(),
    label: yup.string().required(),
    type: dataSchema_schema_1.default.required(),
    required: yup.boolean().required(),
    defaultValue: yup.mixed().nullable(),
});
exports.tileTypeSchema = yup
    .mixed()
    .oneOf(Object.values(actionMap_1.TileType));
exports.accessorTypeSchema = yup
    .mixed()
    .oneOf(Object.values(actionMap_1.AccessorType));
exports.modelAccessOperationSchema = yup
    .mixed()
    .oneOf(Object.values(actionMap_1.ModelAccessOperation));
exports.modelMemoryOperationSchema = yup
    .mixed()
    .oneOf(Object.values(actionMap_1.ModelMemoryOperation));
exports.tileGeneralSchema = yup.object().shape({
    id: yup.string().required(),
    coordinates: yup.object().shape({
        start: yup
            .array()
            .of(yup.number())
            .min(2)
            .max(2)
            .required(),
        end: yup
            .array()
            .of(yup.number())
            .min(2)
            .max(2)
            .required(),
    }),
    type: exports.tileTypeSchema.required(),
});
<<<<<<< HEAD
// AccessorTile schema
=======
>>>>>>> main
exports.accessorTileSchema = exports.tileGeneralSchema
    .concat(yup.object({
    output: yup.array().of(yup.string()).required(),
    accessType: exports.accessorTypeSchema.required(),
}));
<<<<<<< HEAD
// ConstantAccessorTile schema
=======
>>>>>>> main
exports.constantAccessorTileSchema = exports.accessorTileSchema
    .concat(yup.object({
    accessType: yup.mixed().oneOf([actionMap_1.AccessorType.Constant]),
    constantName: yup.string().required(),
}));
<<<<<<< HEAD
// DataInAccessorTile schema
=======
>>>>>>> main
exports.dataInAccessorTileSchema = exports.accessorTileSchema
    .concat(yup.object({
    accessType: yup.mixed().oneOf([actionMap_1.AccessorType.DataIn]),
    dataInProps: exports.dataInSchema.required(),
}));
<<<<<<< HEAD
// MemoryAccessorTile schema
=======
>>>>>>> main
exports.memoryAccessorTileSchema = exports.accessorTileSchema
    .concat(yup.object({
    accessType: yup.mixed().oneOf([actionMap_1.AccessorType.Memory]),
    memoryTileId: yup.string().required(),
}));
<<<<<<< HEAD
// ModelAccessorTile schema
=======
>>>>>>> main
exports.modelAccessorTileSchema = exports.accessorTileSchema
    .concat(yup.object({
    accessType: yup.mixed().oneOf([actionMap_1.AccessorType.Model]),
    modelName: yup.string().required(),
    query: yup.string().required(),
    operation: exports.modelAccessOperationSchema.required(),
}));
<<<<<<< HEAD
// ActionTile schema
=======
>>>>>>> main
exports.actionTileSchema = exports.tileGeneralSchema
    .concat(yup.object({
    output: yup.array().of(yup.string()).required(),
    actionId: yup.string().required(),
    input: yup.array().of(yup.string()).required(),
}));
<<<<<<< HEAD
// MemoryTile schema
=======
>>>>>>> main
exports.memoryTileSchema = exports.tileGeneralSchema
    .concat(yup.object({
    input: yup.array().of(yup.string()).required(),
    memoryType: yup
        .mixed()
        .oneOf(Object.values(actionMap_1.MemoryType))
        .required(),
}));
<<<<<<< HEAD
// ModelMemoryTile schema
=======
>>>>>>> main
exports.modelMemoryTileSchema = exports.memoryTileSchema
    .concat(yup.object({
    memoryType: yup.mixed().oneOf([actionMap_1.MemoryType.Model]),
    modelName: yup.string().required(),
    query: yup.string().required(),
    operation: exports.modelMemoryOperationSchema.required(),
}));
<<<<<<< HEAD
// Combined Tile schema
=======
>>>>>>> main
const tileSchema = yup.lazy(value => {
    switch (value.type) {
        case actionMap_1.TileType.Accessor:
            switch (value.accessType) {
                case actionMap_1.AccessorType.Constant:
                    return exports.constantAccessorTileSchema;
                case actionMap_1.AccessorType.DataIn:
                    return exports.dataInAccessorTileSchema;
                case actionMap_1.AccessorType.Memory:
                    return exports.memoryAccessorTileSchema;
                case actionMap_1.AccessorType.Model:
                    return exports.modelAccessorTileSchema;
                default:
                    return exports.accessorTileSchema;
            }
        case actionMap_1.TileType.Action:
            return exports.actionTileSchema;
        case actionMap_1.TileType.Memory:
            return (value.memoryType === actionMap_1.MemoryType.Model) ? exports.modelMemoryTileSchema : exports.memoryTileSchema;
        default:
            return yup.object().shape({});
    }
});
exports.default = tileSchema;
