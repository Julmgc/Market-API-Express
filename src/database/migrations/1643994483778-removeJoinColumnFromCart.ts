import {MigrationInterface, QueryRunner} from "typeorm";

export class removeJoinColumnFromCart1643994483778 implements MigrationInterface {
    name = 'removeJoinColumnFromCart1643994483778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_69828a178f152f157dcf2f70a89"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "UQ_69828a178f152f157dcf2f70a89"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "userId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "UQ_69828a178f152f157dcf2f70a89" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_69828a178f152f157dcf2f70a89" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
