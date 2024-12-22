import { Blog } from '@domain/blogs/entities/blog.entity';
import { Comment } from '@domain/blogs/entities/comment.entity';
import { User } from '@domain/users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [User, Blog, Comment],
    synchronize: false,
    logging: configService.get('NODE_ENV') === 'development',
  }),
  inject: [ConfigService],
};
