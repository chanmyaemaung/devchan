import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultUserPreferences1710000000001
  implements MigrationInterface
{
  name = 'AddDefaultUserPreferences1710000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ALTER COLUMN "theme" SET DEFAULT 'light',
      ALTER COLUMN "language" SET DEFAULT 'en'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ALTER COLUMN "theme" DROP DEFAULT,
      ALTER COLUMN "language" DROP DEFAULT
    `);
  }
}
