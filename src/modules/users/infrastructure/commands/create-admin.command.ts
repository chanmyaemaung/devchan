import { Command, CommandRunner } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserRepository } from '../repositories/user.repository';
import { UserRole } from '../../domain/entities/user.entity';

@Injectable()
@Command({ name: 'create-admin', description: 'Create admin user' })
export class CreateAdminCommand extends CommandRunner {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async run(): Promise<void> {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';

    const existingAdmin = await this.userRepository.findByEmail(adminEmail);
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const hashedPassword = await argon2.hash(adminPassword);
    await this.userRepository.create({
      email: adminEmail,
      firstName: 'Admin',
      lastName: 'User',
      password: hashedPassword,
      role: UserRole.ADMIN,
    });

    console.log('Admin user created successfully');
  }
}
