"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionMapHandler = void 0;
const ajv_1 = require("ajv");
const uuid_1 = require("uuid");
const actionMap_1 = require("./types/actionMap");
const actionMapSchema_1 = require("./schema/actionMapSchema");
const accessorTileSchema_1 = require("./schema/accessorTileSchema");
const actionTileSchema_1 = require("./schema/actionTileSchema");
const memoryTileSchema_1 = require("./schema/memoryTileSchema");
const dataSchema_1 = require("../dataSchema/types/dataSchema");
const dataSchema_2 = require("../dataSchema/dataSchema");
class ActionMapHandler {
    constructor(actionMap, models, actionFetcher) {
        this.actionMap = actionMap;
        this.models = models;
        this.actionFetcher = actionFetcher;
        this.ajv = new ajv_1.default();
        this.dataSchemaHandler = new dataSchema_2.DataSchemaHandler();
        this.validateSchema();
    }
    // PUBLIC ------------------------------------------------------------------
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
     */
    validateSchema() {
        const validate = this.ajv.compile(actionMapSchema_1.actionMapSchema);
        const valid = validate(this.actionMap);
        if (!valid) {
            throw new Error(`Invalid action map schema: ${this.ajv.errorsText(validate.errors)}`);
        }
        return valid;
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
     */
    async getAccessorOutputSchema(tile) {
        const source = tile.source.split('::');
        const sourceType = source[0];
        const sourceId = source[1];
        switch (sourceType) {
            case actionMap_1.AccessorSources.Memory:
                return this.getMemorySchema(sourceId);
            case actionMap_1.AccessorSources.Model:
                return this.getModelSchema(sourceId); // TODO: reimplement
            case actionMap_1.AccessorSources.Constant:
                throw new Error('No implementation');
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
     */
    validateTile(tile) {
        let validationSchema;
        switch (tile.type) {
            case actionMap_1.TileType.Accessor:
                validationSchema = accessorTileSchema_1.accessorTileSchema;
                break;
            case actionMap_1.TileType.Action:
                validationSchema = actionTileSchema_1.actionTileSchema;
                break;
            case actionMap_1.TileType.Memory:
                validationSchema = memoryTileSchema_1.memoryTileSchema;
                break;
            default:
                throw new Error(`Invalid tile type: ${tile.type}`);
        }
        const validate = this.ajv.compile(validationSchema);
        const valid = validate(tile);
        if (!valid) {
            throw new Error(`Invalid tile schema: ${this.ajv.errorsText(validate.errors)}`);
        }
        return valid;
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
     */
    addTile(tile) {
        this.validateTile(tile);
        this.actionMap.tiles.push(tile);
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
     */
    removeTile(id) {
        const index = this.actionMap.tiles.findIndex((t) => t.id === id);
        if (index === -1) {
            throw new Error(`Tile ${id} not found`);
        }
        // delete inputs ant outputs for this tile
        const outputsForDelete = this.actionMap.outputs.filter((o) => {
            var _a, _b;
            return ((_a = this.actionMap.tiles[index].output) === null || _a === void 0 ? void 0 : _a.includes(o.id))
                || ((_b = this.actionMap.tiles[index].input) === null || _b === void 0 ? void 0 : _b.includes(o.id));
        });
        outputsForDelete.forEach((o) => {
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
     */
    async canConnectTiles(fromTileId, toTileId, cb) {
        const fromTile = this.actionMap.tiles.find((t) => t.id === fromTileId);
        const toTile = this.actionMap.tiles.find((t) => t.id === toTileId);
        if ((toTile === null || toTile === void 0 ? void 0 : toTile.type) === actionMap_1.TileType.Memory) {
            return true;
        }
        if ((toTile === null || toTile === void 0 ? void 0 : toTile.type) !== actionMap_1.TileType.Action) {
            return false;
        }
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
     */
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
        // TODO: check compatiblePaths with output
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
     */
    removeOutput(id) {
        const index = this.actionMap.outputs.findIndex((o) => o.id === id);
        if (index === -1) {
            throw new Error(`Output ${id} not found`);
        }
        this.actionMap.outputs.splice(index, 1);
        // remove output from tiles
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
     */
    updateTileCoordinates(id, start, end) {
        const tile = this.actionMap.tiles.find((t) => t.id === id);
        if (!tile) {
            throw new Error(`Tile ${id} not found`);
        }
        const anotherTileIntersects = this.tilesIntersect(start, end);
        if (anotherTileIntersects) {
            this.updateCoordinatesForTilesAndOutputs(tile, start, end); // TODO: check if it's ok
        }
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
     */
    updateCoordinatesForTilesAndOutputs(tile, start, end) {
        // get difference between old and new coordinates
        const xDiff = start[0] - tile.coordinates.start[0];
        const yDiff = start[1] - tile.coordinates.start[1];
        // get all tiles that are intersect or after the dragged tile
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
        // move tiles
        tilesToMove.forEach((t) => {
            t.coordinates.start[0] += xDiff;
            t.coordinates.start[1] += yDiff;
            t.coordinates.end[0] += xDiff;
            t.coordinates.end[1] += yDiff;
        });
        // move outputs
        this.actionMap.outputs.forEach((o) => {
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
     */
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
     */
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
     */
    async getActionArgumentsSchema(actionId) {
        const action = await this.actionFetcher(actionId);
        if (!action) {
            throw new Error(`Action ${actionId} not found`);
        }
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
     */
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
    // PRIVATE -----------------------------------------------------------------
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
        // get coordinates of current tile and find any tiles that have
        // coordinates +1 by x right, -1 by x left, +1 by y bottom, -1 by y top
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
        // Retrieve a memory object by its ID. Throws an error if not found.
        const memory = this.getMemoryById(id);
        if (!memory) {
            throw new Error(`Memory ${id} not found`);
        }
        // Fetch the outputs associated with the memory's input IDs.
        const inOutputs = this.getOutputsByIds(memory.input);
        // This array will hold the schemas for each input.
        const inputSchemas = await this.processOutputs(inOutputs);
        // If there's only one input schema without an argument, return it directly.
        if (inputSchemas.length === 1 && !inputSchemas[0].argument) {
            return inputSchemas[0].schema;
        }
        // Prepare to construct a combined schema for multiple inputs.
        const properties = {};
        // For each input schema, add a reference to it in the properties of the combined schema.
        inputSchemas.forEach((schema) => {
            if (schema.argument) {
                properties[schema.argument] = schema.schema;
            }
        });
        // Return the combined schema.
        return {
            type: dataSchema_1.ComplexDataType.Object,
            properties,
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
     */
    async processOutputs(inOutputs) {
        const inputSchemas = await Promise.all(inOutputs.map(async (output) => {
            const sourceTile = this.getSourceTileForOutput(output.id);
            // Refactored schema retrieval into a separate function for clarity
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