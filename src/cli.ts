import { CommandFactory } from 'nest-commander';
import { UsersCliModule } from '@modules/users/users-cli.module';

async function bootstrap() {
  await CommandFactory.run(UsersCliModule);
}

bootstrap();
