import {MigrationInterface, QueryRunner} from "typeorm";

export class addPurchasedColumnToCart1643891031417 implements MigrationInterface {
    name = 'addPurchasedColumnToCart1643891031417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" ADD "purchased" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "purchased"`);
    }

}
