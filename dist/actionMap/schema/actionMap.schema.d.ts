import * as yup from 'yup';
declare const actionMapSchema: yup.ObjectSchema<{
    id: string;
    name: string;
    outputs: {}[];
    tiles: {
        type: NonNullable<import("../..").TileType | undefined>;
    }[];
}, yup.AnyObject, {
    id: undefined;
    name: undefined;
    outputs: "";
    tiles: "";
}, "">;
export default actionMapSchema;
