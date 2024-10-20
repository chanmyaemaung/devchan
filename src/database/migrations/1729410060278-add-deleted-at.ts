import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeletedAt1729410060278 implements MigrationInterface {
  name = 'AddDeletedAt1729410060278';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "project"
            ADD "deletedAt" TIMESTAMP
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "deletedAt" TIMESTAMP
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "deletedAt"
        `);
    await queryRunner.query(`
            ALTER TABLE "project" DROP COLUMN "deletedAt"
        `);
  }
}
