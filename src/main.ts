import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  /*
   * Use validation pipes globally
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  /**
   * Disable the X-Powered-By header (Express)
   */
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  /**
   * Setup Swagger Document
   */
  const config = new DocumentBuilder()
    .setTitle('DevChan')
    .setDescription(
      'The purpose of this project is to enable me to work with a web app from my Angular portfolio and expose it as a RESTFull API.',
    )
    .setVersion('0.1.0')
    .setTermsOfService('http://localhost:8000/terms-of-service')
    .setLicense(
      'MIT Licensed',
      'https://github.com/nestjs/nest/blob/master/LICENSE',
    )
    .addServer('http://localhost:8000')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    logger.log(`Server is running at http://localhost:${port}`);
    logger.log(`Application is running on http://localhost:${port}`);
  });
}

bootstrap();
