import { Action } from './types/action';
declare class ActionProcessor {
    action: Action;
    constructor(action: Action);
    getImplementation(): string;
    getArgumentNames(): string[];
}
export default ActionProcessor;
