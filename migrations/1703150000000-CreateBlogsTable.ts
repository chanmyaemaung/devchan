import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBlogsTable1703150000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'blogs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'content',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'excerpt',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'slug',
            type: 'varchar',
            length: '255',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'tags',
            type: 'text[]',
            isNullable: false,
            default: 'ARRAY[]::text[]',
          },
          {
            name: 'featuredImage',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'isPublished',
            type: 'boolean',
            default: false,
          },
          {
            name: 'publishedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'seoMetadata',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    // Create index for tags for better performance
    await queryRunner.query(
      `CREATE INDEX "IDX_blogs_tags" ON "blogs" USING GIN ("tags")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('blogs', 'IDX_blogs_tags');
    await queryRunner.dropTable('blogs');
  }
}
