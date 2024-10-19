import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VALIDATION_SCHEMA } from '@/common/utils';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      expandVariables: true,
      validationSchema: VALIDATION_SCHEMA,
    }),
  ],
})
export class EnvModule {}
