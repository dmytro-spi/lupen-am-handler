import { ActionMap, AccessorTile, Tile, Output, OutputDirection } from './types/actionMap';
import { Model } from '../model/types/model';
import { Action } from '../action/types/action';
import { DataSchema } from '../dataSchema/types/dataSchema';
import { CompatiblePaths } from '../dataSchema/dataSchema';
export type PossibleOutput = {
    coordinates: [number, number];
    direction: OutputDirection;
    active: boolean;
};
export declare class ActionMapHandler {
    private readonly actionMap;
    private readonly models;
    private readonly actionFetcher;
    private dataSchemaHandler;
    constructor(actionMap: ActionMap, models: Model[], actionFetcher: (actionId: string) => Promise<Action>);
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
    validateSchema(): Promise<boolean>;
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
    getAccessorOutputSchema(tile: AccessorTile): Promise<DataSchema>;
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
    validateTile(tile: Tile): Promise<boolean>;
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
    addTile(tile: Tile): ActionMap;
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
    removeTile(id: string): ActionMap;
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
    canConnectTiles(fromTileId: string, toTileId: string, cb: (compatiblePaths: CompatiblePaths) => void): Promise<boolean>;
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
    addOutput(output: Omit<Output, 'id'>, fromTileId: string, toTileId: string): Promise<ActionMap>;
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
    removeOutput(id: string): ActionMap;
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
    updateTileCoordinates(id: string, start: [number, number], end: [number, number]): ActionMap;
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
    updateCoordinatesForTilesAndOutputs(tile: Tile, start: [number, number], end: [number, number]): void;
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
    tilesIntersect(start: [number, number], end: [number, number]): boolean;
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
    getTileOutputSchema(tile: Tile): Promise<DataSchema>;
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
    getActionArgumentsSchema(actionId: string): Promise<DataSchema>;
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
    getTilePossibleOutputs(tile: Tile): Promise<PossibleOutput[]>;
    private getOutputDirection;
    private getOutputCoordinates;
    private getTileNeighbors;
    private getActionOutputSchema;
    private getModelSchema;
    private getMemoryById;
    private getMemorySchema;
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
    private processOutputs;
    private getOutputById;
    private getOutputsByIds;
    private getSourceTileForOutput;
}
