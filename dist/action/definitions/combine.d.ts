import { DataSchema } from "../../dataSchema/types/dataSchema";
import { Action } from '../types/action';
export declare const actionArguments: DataSchema;
export declare const description = "\nConcatenates an array of strings into a single string.\n";
export declare const implementation = "\nconst concat = (strings, divider = ' ') => {\n  const validate = ajv.compile($actionArguments$);\n  const valid = validate({ strings, divider });\n\n  if (!valid) {\n    throw new Error(`Invalid arguments for action $actionName$: ${ajv.errorsText(validate.errors)}`);\n  }\n\n  return strings.join(divider);\n}\n";
export declare const functionCall = "\nconst $variable$ = concat($strings$, $divider$);\n";
export declare const actionOutput: DataSchema;
export declare const combineAction: Action;
