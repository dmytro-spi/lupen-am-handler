import * as yup from 'yup';
import { AccessorType, MemoryType, ModelAccessOperation, ModelMemoryOperation, TileType } from '../types/actionMap';
export declare const dataInSchema: yup.ObjectSchema<{
    name: string;
    label: string;
    type: any;
    required: NonNullable<boolean | undefined>;
    defaultValue: {} | null | undefined;
}, yup.AnyObject, {
    name: undefined;
    label: undefined;
    type: any;
    required: undefined;
    defaultValue: undefined;
}, "">;
<<<<<<< HEAD
export declare const tileTypeSchema: yup.MixedSchema<TileType, yup.AnyObject, undefined, "">;
export declare const accessorTypeSchema: yup.MixedSchema<AccessorType, yup.AnyObject, undefined, "">;
export declare const modelAccessOperationSchema: yup.MixedSchema<ModelAccessOperation, yup.AnyObject, undefined, "">;
export declare const modelMemoryOperationSchema: yup.MixedSchema<ModelMemoryOperation, yup.AnyObject, undefined, "">;
export declare const tileGeneralSchema: yup.ObjectSchema<{
    id: string;
    coordinates: {
        end?: number[];
        start?: number[];
    };
    type: TileType;
=======
export declare const tileTypeSchema: yup.MixedSchema<TileType | undefined, yup.AnyObject, undefined, "">;
export declare const accessorTypeSchema: yup.MixedSchema<AccessorType | undefined, yup.AnyObject, undefined, "">;
export declare const modelAccessOperationSchema: yup.MixedSchema<ModelAccessOperation | undefined, yup.AnyObject, undefined, "">;
export declare const modelMemoryOperationSchema: yup.MixedSchema<ModelMemoryOperation | undefined, yup.AnyObject, undefined, "">;
export declare const tileGeneralSchema: yup.ObjectSchema<{
    id: string;
    coordinates: {
        end: (number | undefined)[];
        start: (number | undefined)[];
    };
    type: NonNullable<TileType | undefined>;
>>>>>>> main
}, yup.AnyObject, {
    id: undefined;
    coordinates: {
        start: "";
        end: "";
    };
    type: undefined;
}, "">;
export declare const accessorTileSchema: yup.ObjectSchema<{
    id: string;
    coordinates: {
<<<<<<< HEAD
        end?: number[];
        start?: number[];
    };
    type: TileType;
} & {
    output: string[];
    accessType: AccessorType;
=======
        end: (number | undefined)[];
        start: (number | undefined)[];
    };
    type: NonNullable<TileType | undefined>;
} & {
    output: (string | undefined)[];
    accessType: NonNullable<AccessorType | undefined>;
>>>>>>> main
}, yup.AnyObject, {
    id: undefined;
    coordinates: {
        start: "";
        end: "";
    };
    type: undefined;
    output: "";
    accessType: undefined;
}, "">;
export declare const constantAccessorTileSchema: yup.ObjectSchema<{
    id: string;
    coordinates: {
<<<<<<< HEAD
        end?: number[];
        start?: number[];
    };
    type: TileType;
    output: string[];
    accessType: {};
} & {
    accessType: {};
=======
        end: (number | undefined)[];
        start: (number | undefined)[];
    };
    type: NonNullable<TileType | undefined>;
    output: (string | undefined)[];
    accessType: {} | undefined;
} & {
    accessType: {} | undefined;
>>>>>>> main
    constantName: string;
}, yup.AnyObject, {
    id: undefined;
    coordinates: {
        start: "";
        end: "";
    };
    type: undefined;
    output: "";
    accessType: undefined;
    constantName: undefined;
}, "">;
export declare const dataInAccessorTileSchema: yup.ObjectSchema<{
    id: string;
    coordinates: {
<<<<<<< HEAD
        end?: number[];
        start?: number[];
    };
    type: TileType;
    output: string[];
    accessType: {};
} & {
    accessType: {};
    dataInProps: {
        required?: boolean;
        type?: any;
        name?: string;
        label?: string;
        defaultValue?: {};
=======
        end: (number | undefined)[];
        start: (number | undefined)[];
    };
    type: NonNullable<TileType | undefined>;
    output: (string | undefined)[];
    accessType: {} | undefined;
} & {
    accessType: {} | undefined;
    dataInProps: {
        type?: any;
        defaultValue?: {} | null | undefined;
        required: NonNullable<boolean | undefined>;
        name: string;
        label: string;
>>>>>>> main
    };
}, yup.AnyObject, {
    id: undefined;
    coordinates: {
        start: "";
        end: "";
    };
    type: undefined;
    output: "";
    accessType: undefined;
    dataInProps: {
        name: undefined;
        label: undefined;
        type: any;
        required: undefined;
        defaultValue: undefined;
    };
}, "">;
export declare const memoryAccessorTileSchema: yup.ObjectSchema<{
    id: string;
    coordinates: {
<<<<<<< HEAD
        end?: number[];
        start?: number[];
    };
    type: TileType;
    output: string[];
    accessType: {};
} & {
    accessType: {};
=======
        end: (number | undefined)[];
        start: (number | undefined)[];
    };
    type: NonNullable<TileType | undefined>;
    output: (string | undefined)[];
    accessType: {} | undefined;
} & {
    accessType: {} | undefined;
>>>>>>> main
    memoryTileId: string;
}, yup.AnyObject, {
    id: undefined;
    coordinates: {
        start: "";
        end: "";
    };
    type: undefined;
    output: "";
    accessType: undefined;
    memoryTileId: undefined;
}, "">;
export declare const modelAccessorTileSchema: yup.ObjectSchema<{
    id: string;
    coordinates: {
<<<<<<< HEAD
        end?: number[];
        start?: number[];
    };
    type: TileType;
    output: string[];
    accessType: {};
} & {
    accessType: {};
    modelName: string;
    query: string;
    operation: ModelAccessOperation;
=======
        end: (number | undefined)[];
        start: (number | undefined)[];
    };
    type: NonNullable<TileType | undefined>;
    output: (string | undefined)[];
    accessType: {} | undefined;
} & {
    accessType: {} | undefined;
    modelName: string;
    query: string;
    operation: NonNullable<ModelAccessOperation | undefined>;
>>>>>>> main
}, yup.AnyObject, {
    id: undefined;
    coordinates: {
        start: "";
        end: "";
    };
    type: undefined;
    output: "";
    accessType: undefined;
    modelName: undefined;
    query: undefined;
    operation: undefined;
}, "">;
export declare const actionTileSchema: yup.ObjectSchema<{
    id: string;
    coordinates: {
<<<<<<< HEAD
        end?: number[];
        start?: number[];
    };
    type: TileType;
} & {
    output: string[];
    actionId: string;
    input: string[];
=======
        end: (number | undefined)[];
        start: (number | undefined)[];
    };
    type: NonNullable<TileType | undefined>;
} & {
    output: (string | undefined)[];
    actionId: string;
    input: (string | undefined)[];
>>>>>>> main
}, yup.AnyObject, {
    id: undefined;
    coordinates: {
        start: "";
        end: "";
    };
    type: undefined;
    output: "";
    actionId: undefined;
    input: "";
}, "">;
export declare const memoryTileSchema: yup.ObjectSchema<{
    id: string;
    coordinates: {
<<<<<<< HEAD
        end?: number[];
        start?: number[];
    };
    type: TileType;
} & {
    input: string[];
    memoryType: MemoryType;
=======
        end: (number | undefined)[];
        start: (number | undefined)[];
    };
    type: NonNullable<TileType | undefined>;
} & {
    input: (string | undefined)[];
    memoryType: NonNullable<MemoryType | undefined>;
>>>>>>> main
}, yup.AnyObject, {
    id: undefined;
    coordinates: {
        start: "";
        end: "";
    };
    type: undefined;
    input: "";
    memoryType: undefined;
}, "">;
export declare const modelMemoryTileSchema: yup.ObjectSchema<{
    id: string;
    coordinates: {
<<<<<<< HEAD
        end?: number[];
        start?: number[];
    };
    type: TileType;
    input: string[];
    memoryType: {};
} & {
    memoryType: {};
    modelName: string;
    query: string;
    operation: ModelMemoryOperation;
=======
        end: (number | undefined)[];
        start: (number | undefined)[];
    };
    type: NonNullable<TileType | undefined>;
    input: (string | undefined)[];
    memoryType: {} | undefined;
} & {
    memoryType: {} | undefined;
    modelName: string;
    query: string;
    operation: NonNullable<ModelMemoryOperation | undefined>;
>>>>>>> main
}, yup.AnyObject, {
    id: undefined;
    coordinates: {
        start: "";
        end: "";
    };
    type: undefined;
    input: "";
    memoryType: undefined;
    modelName: undefined;
    query: undefined;
    operation: undefined;
}, "">;
declare const tileSchema: yup.Lazy<{}, yup.AnyObject, any>;
export default tileSchema;
