"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionMapHandler = void 0;
const uuid_1 = require("uuid");
const bson_1 = require("bson");
const actionMap_1 = require("./types/actionMap");
const actionMap_schema_1 = require("./schema/actionMap.schema");
const dataSchema_1 = require("../dataSchema/types/dataSchema");
const dataSchema_2 = require("../dataSchema/dataSchema");
const tile_schema_1 = require("./schema/tile.schema");
class ActionMapHandler {
    constructor(actionMap, models, actionFetcher) {
        this.models = models;
        this.actionFetcher = actionFetcher;
        this.dataSchemaHandler = new dataSchema_2.DataSchemaHandler();
        this.actionMap = ActionMapHandler.emptyActionMap;
        this.changeStack = [];
        this.futureStack = [];
        if (actionMap) {
            this.actionMap = actionMap;
            this.validateSchema();
        }
        else {
            this.createEmptyActionMap();
        }
    }
    get currentActionMap() {
        return this.actionMap;
    }
    static get emptyActionMap() {
        return {
            id: (0, uuid_1.v4)(),
            name: 'New Action Map',
            tiles: [],
            outputs: [],
        };
    }
    createEmptyActionMap(name) {
        this.putCurrentToPreviousState();
        this.actionMap = {
            id: (0, uuid_1.v4)(),
            name: name ?? 'New Action Map',
            tiles: [],
            outputs: [],
        };
        return this.actionMap;
    }
    renameActionMap(name) {
        this.actionMap.name = name;
        return this.actionMap;
    }
    async validateSchema() {
        await actionMap_schema_1.default.validate(this.actionMap, {
            abortEarly: false,
        });
        return true;
    }
    async getAccessorOutputSchema(tile) {
        const source = tile.accessType;
        const sourceType = source[0];
        const sourceId = source[1];
        switch (tile.accessType) {
            case actionMap_1.AccessorType.Memory:
                return this.getMemorySchema(sourceId);
            case actionMap_1.AccessorType.Model: {
                const modelSchema = this.getModelSchema(sourceId);
                if (tile.operation === actionMap_1.ModelAccessOperation.FindMany) {
                    return {
                        type: dataSchema_1.ComplexDataType.Array,
                        arrayType: modelSchema,
                    };
                }
                return modelSchema;
            }
            case actionMap_1.AccessorType.Constant:
                throw new Error('No implementation');
            case actionMap_1.AccessorType.DataIn:
                throw new Error('No implementation');
            default:
                throw new Error(`Invalid accessor source type: ${sourceType}`);
        }
    }
    async validateTile(tile) {
        switch (tile.type) {
            case actionMap_1.TileType.Accessor:
                await tile_schema_1.accessorTileSchema.validate(tile, {
                    abortEarly: false,
                });
                break;
            case actionMap_1.TileType.Action:
                tile_schema_1.actionTileSchema.validate(tile, {
                    abortEarly: false,
                });
                break;
            case actionMap_1.TileType.Memory:
                tile_schema_1.memoryTileSchema.validate(tile, {
                    abortEarly: false,
                });
                break;
            default:
                throw new Error(`Invalid tile type: ${tile.type}`);
        }
        return true;
    }
    addTile(tile) {
        this.validateTile(tile);
        this.pushNewState({
            ...this.actionMap,
            tiles: [...this.actionMap.tiles, tile],
        });
        return this.actionMap;
    }
    removeTile(id) {
        const index = this.actionMap.tiles.findIndex((t) => t.id === id);
        if (index === -1) {
            throw new Error(`Tile ${id} not found`);
        }
        const outputsForDelete = this.actionMap.outputs.filter((o) => this.actionMap.tiles[index].output?.includes(o.id)
            || this.actionMap.tiles[index].input?.includes(o.id));
        outputsForDelete.forEach((o) => {
            this.removeOutput(o.id);
        });
        this.actionMap.tiles.splice(index, 1);
        return this.actionMap;
    }
    async canConnectTiles(fromTileId, toTileId, cb) {
        const fromTile = this.actionMap.tiles.find((t) => t.id === fromTileId);
        const toTile = this.actionMap.tiles.find((t) => t.id === toTileId);
        if (toTile?.type === actionMap_1.TileType.Memory) {
            return true;
        }
        if (toTile?.type !== actionMap_1.TileType.Action) {
            return false;
        }
        const fromSchema = await this.getTileOutputSchema(fromTile);
        const toSchema = await this.getActionArgumentsSchema(toTile.actionId);
        return this.dataSchemaHandler.isSchemaPartiallyCompatibleWithTopLevelProperties(fromSchema, toSchema, cb);
    }
    async addOutput(output, fromTileId, toTileId) {
        const fromTile = this.actionMap.tiles.find((t) => t.id === fromTileId);
        if (!fromTile) {
            throw new Error(`Tile ${fromTileId} not found`);
        }
        const toTile = this.actionMap.tiles.find((t) => t.id === toTileId);
        if (!toTile) {
            throw new Error(`Tile ${toTileId} not found`);
        }
        let compatiblePaths = [];
        if (!this.canConnectTiles(fromTileId, toTileId, (paths) => {
            compatiblePaths = paths;
        })) {
            throw new Error(`Tiles ${fromTileId} and ${toTileId} are not compatible`);
        }
        const outputId = (0, uuid_1.v4)();
        this.actionMap.outputs.push({
            id: outputId,
            ...output,
        });
        switch (fromTile.type) {
            case actionMap_1.TileType.Accessor:
                fromTile.output.push(outputId);
                break;
            case actionMap_1.TileType.Action:
                fromTile.output.push(outputId);
                break;
            case actionMap_1.TileType.Memory:
                throw new Error('Cannot add output to memory tile');
            default:
                throw new Error(`Invalid tile type: ${fromTile.type}`);
        }
        switch (toTile.type) {
            case actionMap_1.TileType.Accessor:
                throw new Error('Cannot add input to accessor tile');
            case actionMap_1.TileType.Action:
                toTile.input[parseInt(output.toArgument)] = outputId;
                break;
            case actionMap_1.TileType.Memory:
                toTile.input.push(outputId);
                break;
            default:
                throw new Error(`Invalid tile type: ${toTile.type}`);
        }
        return this.actionMap;
    }
    removeOutput(id) {
        const index = this.actionMap.outputs.findIndex((o) => o.id === id);
        if (index === -1) {
            throw new Error(`Output ${id} not found`);
        }
        this.actionMap.outputs.splice(index, 1);
        this.actionMap.tiles = this.actionMap.tiles.map((tile) => {
            const tileCopy = { ...tile };
            switch (tile.type) {
                case actionMap_1.TileType.Accessor:
                    tileCopy.output = tile.output.filter((outputId) => outputId !== id);
                    break;
                case actionMap_1.TileType.Action:
                    tileCopy.input = tile.input.filter((outputId) => outputId !== id);
                    tileCopy.output = tile.output.filter((outputId) => outputId !== id);
                    break;
                case actionMap_1.TileType.Memory:
                    tileCopy.input = tile.input.filter((outputId) => outputId !== id);
                    break;
                default:
                    throw new Error(`Invalid tile type: ${tile.type}`);
            }
            return tile;
        });
        return this.actionMap;
    }
    updateTileCoordinates(id, start, end) {
        const tile = this.actionMap.tiles.find((t) => t.id === id);
        if (!tile) {
            throw new Error(`Tile ${id} not found`);
        }
        const anotherTileIntersects = this.tilesIntersect(start, end);
        if (anotherTileIntersects) {
            this.updateCoordinatesForTilesAndOutputs(tile, start, end);
        }
        tile.coordinates.start = start;
        tile.coordinates.end = end;
        return this.actionMap;
    }
    updateCoordinatesForTilesAndOutputs(tile, start, end) {
        const xDiff = start[0] - tile.coordinates.start[0];
        const yDiff = start[1] - tile.coordinates.start[1];
        const tilesToMove = this.actionMap.tiles.filter((t) => {
            const xStart = t.coordinates.start[0];
            const xEnd = t.coordinates.end[0];
            const yStart = t.coordinates.start[1];
            const yEnd = t.coordinates.end[1];
            return ((xStart >= start[0] && yStart >= start[1])
                || (xEnd >= start[0] && yEnd >= start[1])
                || (xStart >= start[0] && yEnd >= start[1])
                || (xEnd >= start[0] && yStart >= start[1]));
        });
        tilesToMove.forEach((t) => {
            t.coordinates.start[0] += xDiff;
            t.coordinates.start[1] += yDiff;
            t.coordinates.end[0] += xDiff;
            t.coordinates.end[1] += yDiff;
        });
        this.actionMap.outputs.forEach((o) => {
            const fromTile = this.getSourceTileForOutput(o.id);
            if (tilesToMove.includes(fromTile)) {
                o.coordinates[0] += xDiff;
                o.coordinates[1] += yDiff;
            }
        });
    }
    tilesIntersect(start, end) {
        const xStart = start[0];
        const xEnd = end[0];
        const yStart = start[1];
        const yEnd = end[1];
        return this.actionMap.tiles.some((t) => {
            const tXStart = t.coordinates.start[0];
            const tXEnd = t.coordinates.end[0];
            const tYStart = t.coordinates.start[1];
            const tYEnd = t.coordinates.end[1];
            return ((tXStart >= xStart && tXStart <= xEnd && tYStart >= yStart && tYStart <= yEnd)
                || (tXEnd >= xStart && tXEnd <= xEnd && tYEnd >= yStart && tYEnd <= yEnd)
                || (tXStart >= xStart && tXStart <= xEnd && tYEnd >= yStart && tYEnd <= yEnd)
                || (tXEnd >= xStart && tXEnd <= xEnd && tYStart >= yStart && tYStart <= yEnd));
        });
    }
    async getTileOutputSchema(tile) {
        switch (tile.type) {
            case actionMap_1.TileType.Accessor:
                return this.getAccessorOutputSchema(tile);
            case actionMap_1.TileType.Action:
                return this.getActionOutputSchema(tile.actionId);
            case actionMap_1.TileType.Memory:
                return this.getMemorySchema(tile.id);
            default:
                throw new Error(`Invalid tile type: ${tile.type}`);
        }
    }
    async getActionArgumentsSchema(actionId) {
        const action = await this.actionFetcher(actionId);
        if (!action) {
            throw new Error(`Action ${actionId} not found`);
        }
        return JSON.parse(action.arguments);
    }
    async getTilePossibleOutputs(tile) {
        const neighbors = await this.getTileNeighbors(tile);
        const possibleOutputs = await Promise.all(neighbors.map(async (neighbor) => {
            const canBeConnected = await this.canConnectTiles(tile.id, neighbor.id, () => { });
            const direction = this.getOutputDirection(tile, neighbor);
            const coordinates = this.getOutputCoordinates(tile, neighbor, direction);
            return {
                coordinates,
                direction,
                active: canBeConnected,
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
    pushNewState(actionMap) {
        this.clearFutureStack();
        const bsonAM = bson_1.BSON.serialize(this.actionMap);
        this.changeStack.push(bsonAM);
        if (this.changeStack.length > 10) {
            this.changeStack.shift();
        }
        this.actionMap = actionMap;
        return actionMap;
    }
    returnToPreviousState() {
        this.putCurrentToFutureState();
        const bsonAM = this.changeStack.pop();
        if (bsonAM) {
            this.actionMap = bson_1.BSON.deserialize(bsonAM);
        }
        return this.actionMap;
    }
    putCurrentToFutureState() {
        if (!this.actionMap) {
            return this.actionMap;
        }
        const bsonAM = bson_1.BSON.serialize(this.actionMap);
        this.futureStack.push(bsonAM);
        if (this.futureStack.length > 10) {
            this.futureStack.shift();
        }
        return this.actionMap;
    }
    putCurrentToPreviousState() {
        if (!this.actionMap) {
            return this.actionMap;
        }
        const bsonAM = bson_1.BSON.serialize(this.actionMap);
        this.changeStack.push(bsonAM);
        if (this.changeStack.length > 10) {
            this.changeStack.shift();
        }
        return this.actionMap;
    }
    clearFutureStack() {
        this.futureStack = [];
        return this.actionMap;
    }
    returnToFutureState() {
        this.putCurrentToPreviousState();
        const bsonAM = this.futureStack.pop();
        if (bsonAM) {
            this.actionMap = bson_1.BSON.deserialize(bsonAM);
        }
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
        if (neighborXStart === xEnd) {
            return actionMap_1.OutputDirection.Right;
        }
        if (neighborXEnd === xStart) {
            return actionMap_1.OutputDirection.Left;
        }
        if (neighborYStart === yEnd) {
            return actionMap_1.OutputDirection.Down;
        }
        if (neighborYEnd === yStart) {
            return actionMap_1.OutputDirection.Up;
        }
        throw new Error('Invalid output direction');
    }
    getOutputCoordinates(tile, neighbor, direction) {
        const neighborXStart = neighbor.coordinates.start[0];
        const neighborXEnd = neighbor.coordinates.end[0];
        const neighborYStart = neighbor.coordinates.start[1];
        const neighborYEnd = neighbor.coordinates.end[1];
        switch (direction) {
            case actionMap_1.OutputDirection.Down:
                return [neighborXStart, neighborYStart - 1];
            case actionMap_1.OutputDirection.Right:
                return [neighborXStart - 1, neighborYStart];
            case actionMap_1.OutputDirection.Up:
                return [neighborXStart, neighborYEnd + 1];
            case actionMap_1.OutputDirection.Left:
                return [neighborXEnd + 1, neighborYStart];
            default:
                throw new Error('Invalid output direction');
        }
    }
    getTileNeighbors(tile) {
        const neighbors = [];
        const xStart = tile.coordinates.start[0];
        const xEnd = tile.coordinates.end[0];
        const yStart = tile.coordinates.start[1];
        const yEnd = tile.coordinates.end[1];
        this.actionMap.tiles.forEach((t) => {
            if ((t.coordinates.start[0] === xEnd
                && t.coordinates.start[1] >= yStart
                && t.coordinates.start[1] <= yEnd)
                || (t.coordinates.end[0] === xStart
                    && t.coordinates.end[1] >= yStart
                    && t.coordinates.end[1] <= yEnd)
                || (t.coordinates.start[1] === yEnd
                    && t.coordinates.start[0] >= xStart
                    && t.coordinates.start[0] <= xEnd)
                || (t.coordinates.end[1] === yStart
                    && t.coordinates.end[0] >= xStart
                    && t.coordinates.end[0] <= xEnd)) {
                neighbors.push(t);
            }
        });
        return neighbors;
    }
    async getActionOutputSchema(actionId) {
        const action = await this.actionFetcher(actionId);
        if (!action) {
            throw new Error(`Action ${actionId} not found`);
        }
        return JSON.parse(action.output);
    }
    getModelSchema(modelName) {
        const model = this.models.find((m) => m.name === modelName);
        if (!model) {
            throw new Error(`Model ${modelName} not found`);
        }
        return JSON.parse(model.schema);
    }
    getMemoryById(id) {
        return (this.actionMap.tiles.find((tile) => tile.type === actionMap_1.TileType.Memory && tile.id === id) || null);
    }
    async getMemorySchema(id) {
        const memory = this.getMemoryById(id);
        if (!memory) {
            throw new Error(`Memory ${id} not found`);
        }
        const inOutputs = this.getOutputsByIds(memory.input);
        const inputSchemas = await this.processOutputs(inOutputs);
        if (inputSchemas.length === 1 && !inputSchemas[0].argument) {
            return inputSchemas[0].schema;
        }
        const properties = {};
        inputSchemas.forEach((schema) => {
            if (schema.argument) {
                properties[schema.argument] = schema.schema;
            }
        });
        return {
            type: dataSchema_1.ComplexDataType.Object,
            properties,
        };
    }
    async processOutputs(inOutputs) {
        const inputSchemas = await Promise.all(inOutputs.map(async (output) => {
            const sourceTile = this.getSourceTileForOutput(output.id);
            const sourceTileOutputSchema = await this.getTileOutputSchema(sourceTile);
            let outputSchema;
            if (output.outputPath) {
                if (!this.dataSchemaHandler.validateSchema(sourceTileOutputSchema)) {
                    throw new Error(`Invalid schema for tile ${sourceTile.id}`);
                }
                outputSchema = this.dataSchemaHandler.getSchemaFromPath(sourceTileOutputSchema, output.outputPath);
                if (!this.dataSchemaHandler.validateSchema(outputSchema)) {
                    throw new Error(`Output field ${output.outputPath} not found in tile ${sourceTile.id}`);
                }
            }
            else {
                outputSchema = sourceTileOutputSchema;
            }
            return {
                argument: output.toArgument,
                schema: outputSchema,
            };
        }));
        return inputSchemas;
    }
    getOutputById(id) {
        const output = this.actionMap.outputs.find((o) => o.id === id);
        if (!output) {
            throw new Error(`Output ${id} not found`);
        }
        return output;
    }
    getOutputsByIds(ids) {
        return ids.map((id) => this.getOutputById(id));
    }
    getSourceTileForOutput(outputId) {
        const tile = this.actionMap.tiles.find((t) => {
            switch (t.type) {
                case actionMap_1.TileType.Accessor:
                    return t.output.includes(outputId);
                case actionMap_1.TileType.Action:
                    return t.output.includes(outputId);
                case actionMap_1.TileType.Memory:
                    return false;
                default:
                    throw new Error(`Invalid tile type: ${t.type}`);
            }
        });
        if (!tile) {
            throw new Error(`Tile for output ${outputId} not found`);
        }
        return tile;
    }
}
exports.ActionMapHandler = ActionMapHandler;
