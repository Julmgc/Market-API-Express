import {MigrationInterface, QueryRunner} from "typeorm";

export class excludePurchaseColumnFromCart1643999836769 implements MigrationInterface {
    name = 'excludePurchaseColumnFromCart1643999836769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "purchased"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" ADD "purchased" boolean NOT NULL`);
    }

}
