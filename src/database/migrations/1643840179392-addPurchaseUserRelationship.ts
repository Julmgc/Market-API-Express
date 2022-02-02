import {MigrationInterface, QueryRunner} from "typeorm";

export class addPurchaseUserRelationship1643840179392 implements MigrationInterface {
    name = 'addPurchaseUserRelationship1643840179392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchases" ADD "user" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD "purchases" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD CONSTRAINT "FK_341f0dbe584866284359f30f3da" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_341f0dbe584866284359f30f3da"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "purchases"`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "user"`);
    }

}
