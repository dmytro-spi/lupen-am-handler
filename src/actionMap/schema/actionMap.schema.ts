import * as yup from 'yup';
import outputSchema from './output.schema';
import tileSchema from './tile.schema';

// ActionMap schema
const actionMapSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  outputs: yup.array().of(outputSchema).required(),
  tiles: yup.array().of(tileSchema).required(),
});

export default actionMapSchema;
