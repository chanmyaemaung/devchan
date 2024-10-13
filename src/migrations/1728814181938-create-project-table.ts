import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProjectTable1728814181938 implements MigrationInterface {
  name = 'CreateProjectTable1728814181938';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "project" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" text,
                "url" text,
                "image" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "UQ_dedfea394088ed136ddadeee89c" UNIQUE ("name"),
                CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "project"
        `);
  }
}
