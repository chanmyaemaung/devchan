import * as argon2 from 'argon2';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1703116800001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminPassword = await argon2.hash('Admin@123');
    const userPassword = await argon2.hash('User@123');

    // Insert admin user
    await queryRunner.query(`
      INSERT INTO users (name, email, password, role)
      VALUES ('Admin User', 'admin@example.com', '${adminPassword}', 'admin')
    `);

    // Insert regular user
    await queryRunner.query(`
      INSERT INTO users (name, email, password, role)
      VALUES ('Regular User', 'user@example.com', '${userPassword}', 'user')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM users 
      WHERE email IN ('admin@example.com', 'user@example.com')
    `);
  }
}
