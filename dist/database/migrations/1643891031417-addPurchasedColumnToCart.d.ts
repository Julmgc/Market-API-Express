import { MigrationInterface, QueryRunner } from "typeorm";
export declare class addPurchasedColumnToCart1643891031417 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
