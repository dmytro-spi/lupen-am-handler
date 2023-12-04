import { Action } from './types/action';

class ActionProcessor {
  action: Action;

  constructor(action: Action) {
    this.action = action;
  }

  getImplementation(): string {
    const filledArguments = this.action.implementation.replace(/\$actionArguments\$/g, this.action.arguments);

    return filledArguments.replace(/\$actionName\$/g, this.action.name);
  }

  getArgumentNames(): string[] {
    const jsonSchema = JSON.parse(this.action.arguments);

    return Object.keys(jsonSchema.properties);
  }
}

export default ActionProcessor;
