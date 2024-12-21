import * as argon2 from 'argon2';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserRole } from '../src/domain/users/entities/user.entity';

export class SeedUsers1703116800001 implements MigrationInterface {
  name = 'SeedUsers1703116800001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Hash passwords
    const adminPassword = await argon2.hash('Admin@123');
    const userPassword = await argon2.hash('User@123');

    // Insert admin user
    await queryRunner.query(`
      INSERT INTO "users" (
        "id",
        "name",
        "email",
        "password",
        "role",
        "is_active",
        "created_at",
        "updated_at"
      ) VALUES (
        '00000000-0000-0000-0000-000000000001',
        'Admin User',
        'admin@example.com',
        '${adminPassword}',
        '${UserRole.ADMIN}',
        true,
        NOW(),
        NOW()
      );
    `);

    // Insert regular user
    await queryRunner.query(`
      INSERT INTO "users" (
        "id",
        "name",
        "email",
        "password",
        "role",
        "is_active",
        "created_at",
        "updated_at"
      ) VALUES (
        '00000000-0000-0000-0000-000000000002',
        'Regular User',
        'user@example.com',
        '${userPassword}',
        '${UserRole.USER}',
        true,
        NOW(),
        NOW()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "users"
      WHERE "id" IN (
        '00000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000002'
      );
    `);
  }
}
