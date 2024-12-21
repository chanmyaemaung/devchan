import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBlogContentImages1703150000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // No need to modify the column structure since we're using JSONB
    // The new images field will be automatically supported
    // Just need to update existing records to ensure they have the correct structure
    await queryRunner.query(`
      UPDATE blogs 
      SET content = jsonb_set(
        content, 
        '{images}', 
        '[]'::jsonb
      )
      WHERE content->>'images' IS NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove images field from content
    await queryRunner.query(`
      UPDATE blogs 
      SET content = content - 'images';
    `);
  }
}
