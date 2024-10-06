import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  DATASOURCE_PORT: Joi.number().port().default(5432),
  DATASOURCE_USERNAME: Joi.string().required(),
  DATASOURCE_PASSWORD: Joi.string().required(),
  DATASOURCE_HOST: Joi.string().required(),
  DATASOURCE_DATABASE: Joi.string().required(),
});
