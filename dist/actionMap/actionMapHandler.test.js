"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const actionMapHandler_1 = require("./actionMapHandler");
describe('ActionMapHandler', () => {
    describe('emptyActionMap', () => {
        it('should return an empty action map with a unique ID and default name', () => {
            const result = actionMapHandler_1.ActionMapHandler.emptyActionMap;
            expect(result).toEqual({
                id: expect.any(String),
                name: 'New Action Map',
                tiles: [],
                outputs: [],
            });
            expect((0, uuid_1.validate)(result.id)).toBe(true);
        });
    });
    describe('emptyActionMap', () => {
        it('should return an empty action map with a unique ID and default name', () => {
            const actionMapHandler = new actionMapHandler_1.ActionMapHandler(null, [], async () => undefined);
            const result = actionMapHandler.createEmptyActionMap();
            expect(result).toEqual({
                id: expect.any(String),
                name: 'New Action Map',
                tiles: [],
                outputs: [],
            });
            expect((0, uuid_1.validate)(result.id)).toBe(true);
        });
        it('should return an empty action map with a unique ID and provided name', () => {
            const actionMapHandler = new actionMapHandler_1.ActionMapHandler(null, [], async () => undefined);
            const name = 'Custom Action Map';
            const result = actionMapHandler.createEmptyActionMap(name);
            expect(result).toEqual({
                id: expect.any(String),
                name: name,
                tiles: [],
                outputs: [],
            });
            expect((0, uuid_1.validate)(result.id)).toBe(true);
        });
    });
    describe('renameActionMap', () => {
        it('should rename the action map with the provided name', () => {
            const actionMapHandler = new actionMapHandler_1.ActionMapHandler(null, [], async () => undefined);
            actionMapHandler.createEmptyActionMap();
            const newName = 'New Action Map1';
            const result = actionMapHandler.renameActionMap(newName);
            expect(result.name).toBe(newName);
        });
    });
    describe('validateSchema', () => {
        it('should return true when the action map schema is valid', async () => {
            const validActionMap = {
                id: 'valid-id',
                name: 'Valid Action Map',
                tiles: [],
                outputs: [],
            };
            const actionMapHandler = new actionMapHandler_1.ActionMapHandler(validActionMap, [], async () => undefined);
            const result = await actionMapHandler.validateSchema();
            expect(result).toBe(true);
        });
        it('should throw an error when the action map schema is invalid', async () => {
            const invalidActionMap = {
                id: 'invalid-id',
                name: 'Invalid Action Map',
                tiles: [
                    {
                        id: 'invalid-tile-id',
                        name: 'Invalid Tile',
                        type: 'invalid-type',
                        сonditions: [],
                    },
                ],
                outputs: [],
            };
            const actionMapHandler = new actionMapHandler_1.ActionMapHandler(invalidActionMap, [], async () => undefined, {
                skipValidation: true,
            });
            await expect(actionMapHandler.validateSchema()).rejects.toThrow();
        });
    });
});
