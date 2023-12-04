import { v4 as uuidv4 } from 'uuid';
import {
  ComplexDataType,
  DataSchema,
  FormatDataType,
  SimpleDataType,
} from "../../dataSchema/types/dataSchema";
import { Model } from '../types/model';

export const userSchema: DataSchema = {
  type: ComplexDataType.Object,
  properties: {
    email: {
      type: FormatDataType.Email,
    },
    firstName: {
      type: SimpleDataType.Text,
    },
    lastName: {
      type: SimpleDataType.Text,
    },
    dateOfBirth: {
      type: SimpleDataType.Date,
    },
  },
};

export const userModel: Model = {
  id: uuidv4(),
  name: 'user',
  schema: JSON.stringify(userSchema),
};
