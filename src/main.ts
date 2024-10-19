import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.enableCors();
  app.use(helmet());

  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    logger.log(`Server is running at http://localhost:${port}`);
    logger.log(`Application is running on http://localhost:${port}`);
  });
}

bootstrap();
