import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);

  // Use Pino Logger
  app.useLogger(app.get(Logger));

  // Global prefix
  const apiPrefix = configService.get<string>('API_PREFIX') ?? 'api/v1';
  app.setGlobalPrefix(apiPrefix);

  // Enable CORS
  app.enableCors({
    origin: configService.get('APP_URL'),
    credentials: true,
  });

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Cookie parser
  app.use(cookieParser());

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('APP_NAME') ?? 'Chan Portfolio Backend')
    .setDescription(
      configService.get<string>('APP_DESCRIPTION') ??
        'Chan Portfolio Backend API',
    )
    .setVersion(configService.get<string>('APP_VERSION') ?? '1.0.0')
    .addBearerAuth()
    .addCookieAuth('refresh_token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(
    `Swagger documentation is available at: ${await app.getUrl()}/api/docs`,
  );
}
bootstrap();
