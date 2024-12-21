import { User, UserRole } from '@domain/users/entities/user.entity';
import * as argon2 from 'argon2';
import { DataSource } from 'typeorm';

export const seedUsers = async (dataSource: DataSource): Promise<void> => {
  const userRepository = dataSource.getRepository(User);

  // Clear existing users
  await userRepository.clear();

  // Create admin user
  const adminUser = new User({
    name: 'Admin User',
    email: 'admin@example.com',
    password: await argon2.hash('Admin@123'),
    role: UserRole.ADMIN,
    isActive: true,
  });

  // Create regular user
  const regularUser = new User({
    name: 'Regular User',
    email: 'user@example.com',
    password: await argon2.hash('User@123'),
    role: UserRole.USER,
    isActive: true,
  });

  await userRepository.save([adminUser, regularUser]);
  console.log('✅ User seeds completed');
};
