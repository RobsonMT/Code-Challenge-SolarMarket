import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1753324212923 implements MigrationInterface {
    name = 'InitialMigration1753324212923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "name"`);
    }

}
