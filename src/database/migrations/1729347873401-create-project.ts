import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProject1729347873401 implements MigrationInterface {
  name = 'CreateProject1729347873401';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."project_projecttype_enum" AS ENUM(
                'WooCommerce',
                'Shopify',
                'Magento',
                'PrestaShop',
                'BigCommerce',
                'OpenCart',
                'Squarespace',
                'Wix eCommerce',
                'Ecwid',
                'WordPress',
                'Joomla',
                'Drupal',
                'Custom Website',
                'Mobile App',
                'Web Application',
                'Landing Page',
                'Blog Site',
                'Portfolio Site',
                'E-Learning Platform',
                'Social Network',
                'Marketplace Platform',
                'SaaS Platform',
                'Other'
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "project" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "description" character varying NOT NULL,
                "image" character varying NOT NULL,
                "url" character varying NOT NULL,
                "projectType" "public"."project_projecttype_enum" NOT NULL DEFAULT 'Other',
                "userId" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "project"
            ADD CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "project" DROP CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63"
        `);
    await queryRunner.query(`
            DROP TABLE "project"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."project_projecttype_enum"
        `);
  }
}
