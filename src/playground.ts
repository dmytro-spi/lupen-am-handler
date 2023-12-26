import { combineAction } from "./action/definitions/combine";
import { Action } from "./action/types/action";
import { ActionMapHandler } from "./actionMap/actionMapHandler";
import { userModel } from "./model/definitions/user";

const actionFetcher = async (actionId: string): Promise<Action | undefined> => {
  return [
    combineAction,
  ].find((action) => action.id === actionId);
}

const amHandler = new ActionMapHandler(
  null,
  [
    userModel,
  ],
  actionFetcher,
);

const run = async () => {
  console.log('amHandler', await amHandler.validateSchema());
}

run().then(() => console.log('done')).catch((err) => console.log('err', err));
