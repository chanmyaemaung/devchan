import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { User } from '@/domain/users/entities/user.entity';
import { HashingService } from '@/auth/hashing';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    /**
     * Injecting Datasource
     */
    private readonly datasource: DataSource,
    /**
     * Injecting Hashing Service
     */
    private readonly hashingService: HashingService,
  ) {
    datasource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    const { entity: user } = event;
    user.password = await this.hashingService.hash(user.password);
  }

  async beforeUpdate(event: UpdateEvent<User>) {
    const { entity, databaseEntity: databaseUser } = event;
    const user = entity as User;

    if (user.password !== databaseUser.password) {
      user.password = await this.hashingService.hash(user.password);
    }
  }
}
