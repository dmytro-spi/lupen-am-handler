import { validate } from 'uuid';
import { ActionMapHandler } from './actionMapHandler';
import { ActionMap } from './types/actionMap';

class ActionMapHandlerTest extends ActionMapHandler {
  public get changeStack() {
    return this._changeStack;
  }
}

describe('ActionMapHandler', () => {
  describe('emptyActionMap', () => {
    it('should return an empty action map with a unique ID and default name', () => {
      // Arrange

      // Act
      const result = ActionMapHandler.emptyActionMap;

      // Assert
      expect(result).toEqual({
        id: expect.any(String),
        name: 'New Action Map',
        tiles: [],
        outputs: [],
      });
      expect(validate(result.id)).toBe(true);
    });
  });

  describe('emptyActionMap', () => {
    it('should return an empty action map with a unique ID and default name', () => {
      // Arrange
      const actionMapHandler = new ActionMapHandler(
        null,
        [],
        async () => undefined,
      );

      // Act
      const result = actionMapHandler.createEmptyActionMap();

      // Assert
      expect(result).toEqual({
        id: expect.any(String),
        name: 'New Action Map',
        tiles: [],
        outputs: [],
      });
      expect(validate(result.id)).toBe(true);
    });

    it('should return an empty action map with a unique ID and provided name', () => {
      // Arrange
      const actionMapHandler = new ActionMapHandler(
        null,
        [],
        async () => undefined,
      );
      const name = 'Custom Action Map';

      // Act
      const result = actionMapHandler.createEmptyActionMap(name);

      // Assert
      expect(result).toEqual({
        id: expect.any(String),
        name: name,
        tiles: [],
        outputs: [],
      });
      expect(validate(result.id)).toBe(true);
    });
  });

  describe('renameActionMap', () => {
    it('should rename the action map with the provided name', () => {
      // Arrange
      const actionMapHandler = new ActionMapHandler(
        null,
        [],
        async () => undefined,
      );

      actionMapHandler.createEmptyActionMap();
      const newName = 'New Action Map1';

      // Act
      const result = actionMapHandler.renameActionMap(newName);

      // Assert
      expect(result.name).toBe(newName);
    });
  });

  describe('validateSchema', () => {
    it('should return true when the action map schema is valid', async () => {
      // Arrange
      const validActionMap = {
        id: 'valid-id',
        name: 'Valid Action Map',
        tiles: [],
        outputs: [],
      };
      const actionMapHandler = new ActionMapHandler(
        validActionMap,
        [],
        async () => undefined,
      );

      // Act
      const result = await actionMapHandler.validateSchema();

      // Assert
      expect(result).toBe(true);
    });

    it('should throw an error when the action map schema is invalid', async () => {
      // Arrange
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
      const actionMapHandler = new ActionMapHandler(
        invalidActionMap as any,
        [],
        async () => undefined,
        {
          skipValidation: true,
        }
      );

      // Act and Assert
      await expect(actionMapHandler.validateSchema()).rejects.toThrow();
    });
  });

  describe('pushNewState', () => {
    it('should push a new state to the change stack and update the action map', () => {
      // Arrange
      const actionMapHandler = new ActionMapHandler(
        null,
        [],
        async () => undefined,
      );
      const actionMap: ActionMap = {
        id: 'test-id',
        name: 'Test Action Map',
        tiles: [],
        outputs: [],
      };

      // Act
      const result = actionMapHandler.pushNewState(actionMap);

      // Assert
      expect(result).toBe(actionMap);
      expect(actionMapHandler.changeStack.length).toBe(1);
      expect(actionMapHandler.changeStack[0]).toEqual(expect.any(BSON));
      expect(actionMapHandler.actionMap).toBe(actionMap);
    });

    it('should remove the oldest state from the change stack if it exceeds the limit', () => {
      // Arrange
      const actionMapHandler = new ActionMapHandler(
        null,
        [],
        async () => undefined,
      );
      const actionMap1: ActionMap = {
        id: 'test-id1',
        name: 'Test Action Map 1',
        tiles: [],
        outputs: [],
      };
      const actionMap2: ActionMap = {
        id: 'test-id2',
        name: 'Test Action Map 2',
        tiles: [],
        outputs: [],
      };
      const actionMap3: ActionMap = {
        id: 'test-id3',
        name: 'Test Action Map 3',
        tiles: [],
        outputs: [],
      };
      const actionMap4: ActionMap = {
        id: 'test-id4',
        name: 'Test Action Map 4',
        tiles: [],
        outputs: [],
      };
      const actionMap5: ActionMap = {
        id: 'test-id5',
        name: 'Test Action Map 5',
        tiles: [],
        outputs: [],
      };
      const actionMap6: ActionMap = {
        id: 'test-id6',
        name: 'Test Action Map 6',
        tiles: [],
        outputs: [],
      };
      const actionMap7: ActionMap = {
        id: 'test-id7',
        name: 'Test Action Map 7',
        tiles: [],
        outputs: [],
      };
      const actionMap8: ActionMap = {
        id: 'test-id8',
        name: 'Test Action Map 8',
        tiles: [],
        outputs: [],
      };
      const actionMap9: ActionMap = {
        id: 'test-id9',
        name: 'Test Action Map 9',
        tiles: [],
        outputs: [],
      };
      const actionMap10: ActionMap = {
        id: 'test-id10',
        name: 'Test Action Map 10',
        tiles: [],
        outputs: [],
      };
      const actionMap11: ActionMap = {
        id: 'test-id11',
        name: 'Test Action Map 11',
        tiles: [],
        outputs: [],
      };

      // Act
      actionMapHandler.pushNewState(actionMap1);
      actionMapHandler.pushNewState(actionMap2);
      actionMapHandler.pushNewState(actionMap3);
      actionMapHandler.pushNewState(actionMap4);
      actionMapHandler.pushNewState(actionMap5);
      actionMapHandler.pushNewState(actionMap6);
      actionMapHandler.pushNewState(actionMap7);
      actionMapHandler.pushNewState(actionMap8);
      actionMapHandler.pushNewState(actionMap9);
      actionMapHandler.pushNewState(actionMap10);
      const result = actionMapHandler.pushNewState(actionMap11);

      // Assert
      expect(result).toBe(actionMap11);
      expect(actionMapHandler.changeStack.length).toBe(10);
      expect(actionMapHandler.changeStack[0]).not.toEqual(expect.any(BSON));
      expect(actionMapHandler.changeStack[9]).toEqual(expect.any(BSON));
      expect(actionMapHandler.actionMap).toBe(actionMap11);
    });
  });
});