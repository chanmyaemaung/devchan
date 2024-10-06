import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DATASOURCE_HOST || 'localhost',
  port: parseInt(process.env.DATASOURCE_PORT) || 5432,
  user: process.env.DATASOURCE_USERNAME,
  password: process.env.DATASOURCE_PASSWORD,
  name: process.env.DATASOURCE_DATABASE,
  synchronize: process.env.DATASOURCE_SYNC === 'true',
  autoLoadEntities: process.env.DATASOURCE_AUTOLOAD === 'true',
}));
