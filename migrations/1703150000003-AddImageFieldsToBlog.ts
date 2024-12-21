import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImageFieldsToBlog1703150000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add featuredImagePublicId column
    await queryRunner.query(`
      ALTER TABLE blogs
      ADD COLUMN "featuredImagePublicId" VARCHAR;
    `);

    // Update content column to include images array
    await queryRunner.query(`
      ALTER TABLE blogs
      ALTER COLUMN content TYPE jsonb USING content::jsonb;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove featuredImagePublicId column
    await queryRunner.query(`
      ALTER TABLE blogs
      DROP COLUMN "featuredImagePublicId";
    `);

    // Revert content column changes
    await queryRunner.query(`
      ALTER TABLE blogs
      ALTER COLUMN content TYPE jsonb USING content::jsonb;
    `);
  }
}
