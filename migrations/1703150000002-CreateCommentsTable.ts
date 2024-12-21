import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCommentsTable1703150000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'comments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'content',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'blogId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'isEdited',
            type: 'boolean',
            default: false,
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
        foreignKeys: [
          {
            columnNames: ['blogId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'blogs',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          {
            name: 'IDX_comments_blog',
            columnNames: ['blogId'],
          },
          {
            name: 'IDX_comments_user',
            columnNames: ['userId'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('comments');
  }
}
