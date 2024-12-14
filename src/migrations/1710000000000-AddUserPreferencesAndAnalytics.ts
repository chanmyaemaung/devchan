import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserPreferencesAndAnalytics1710000000000
  implements MigrationInterface
{
  name = 'AddUserPreferencesAndAnalytics1710000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN "theme" character varying,
      ADD COLUMN "language" character varying,
      ADD COLUMN "lastLoginAt" TIMESTAMP
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      DROP COLUMN "theme",
      DROP COLUMN "language",
      DROP COLUMN "lastLoginAt"
    `);
  }
}
