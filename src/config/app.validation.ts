import * as Joi from 'joi';

export const AppValidationSchema = Joi.object({
  PORT: Joi.number().default(3000).required(),
  MONGO_DB_CONNECTION_STRING: Joi.string().required()
});
