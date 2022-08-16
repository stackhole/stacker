import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1654484549934 implements MigrationInterface {
    name = 'migration1654484549934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_1da3b6b99d783daa623a5155262" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
