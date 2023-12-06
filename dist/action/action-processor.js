"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ActionProcessor {
    constructor(action) {
        this.action = action;
    }
    getImplementation() {
        const filledArguments = this.action.implementation.replace(/\$actionArguments\$/g, this.action.arguments);
        return filledArguments.replace(/\$actionName\$/g, this.action.name);
    }
    getArgumentNames() {
        const jsonSchema = JSON.parse(this.action.arguments);
        return Object.keys(jsonSchema.properties);
    }
}
exports.default = ActionProcessor;
