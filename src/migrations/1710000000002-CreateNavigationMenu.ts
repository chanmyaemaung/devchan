import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNavigationMenu1710000000002 implements MigrationInterface {
  name = 'CreateNavigationMenu1710000000002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "public"."navigation_type_enum" AS ENUM('header', 'footer')
    `);

    await queryRunner.query(`
      CREATE TABLE "navigation_menus" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "titleMM" character varying,
        "url" character varying,
        "order" integer NOT NULL,
        "type" "public"."navigation_type_enum" NOT NULL DEFAULT 'header',
        "isActive" boolean NOT NULL DEFAULT true,
        "parentId" uuid,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_navigation_menus" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "navigation_menus"
      ADD CONSTRAINT "FK_navigation_parent"
      FOREIGN KEY ("parentId")
      REFERENCES "navigation_menus"("id")
      ON DELETE SET NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "navigation_menus"
      DROP CONSTRAINT "FK_navigation_parent"
    `);
    await queryRunner.query(`DROP TABLE "navigation_menus"`);
    await queryRunner.query(`DROP TYPE "public"."navigation_type_enum"`);
  }
}
