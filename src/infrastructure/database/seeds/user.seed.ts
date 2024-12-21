import { User, UserRole } from '@domain/users/entities/user.entity';
import * as argon2 from 'argon2';
import { DataSource } from 'typeorm';

export const userSeed = async (dataSource: DataSource): Promise<void> => {
  const userRepository = dataSource.getRepository(User);

  // Check if users already exist
  const existingUsers = await userRepository.find();
  if (existingUsers.length > 0) {
    console.log('Users already seeded');
    return;
  }

  // Create admin user
  const adminUser = userRepository.create({
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Admin User',
    email: 'admin@example.com',
    password: await argon2.hash('Admin@123'),
    role: UserRole.ADMIN,
    isActive: true,
  });

  // Create regular user
  const regularUser = userRepository.create({
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Regular User',
    email: 'user@example.com',
    password: await argon2.hash('User@123'),
    role: UserRole.USER,
    isActive: true,
  });

  // Save users
  await userRepository.save([adminUser, regularUser]);
  console.log('Users seeded successfully');
};
