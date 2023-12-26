"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const combine_1 = require("./action/definitions/combine");
const actionMapHandler_1 = require("./actionMap/actionMapHandler");
const user_1 = require("./model/definitions/user");
const actionFetcher = async (actionId) => {
    return [
        combine_1.combineAction,
    ].find((action) => action.id === actionId);
};
const amHandler = new actionMapHandler_1.ActionMapHandler(null, [
    user_1.userModel,
], actionFetcher);
const run = async () => {
    console.log('amHandler', await amHandler.validateSchema());
};
run().then(() => console.log('done')).catch((err) => console.log('err', err));
