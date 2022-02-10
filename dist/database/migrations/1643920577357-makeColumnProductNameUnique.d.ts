import { MigrationInterface, QueryRunner } from "typeorm";
export declare class makeColumnProductNameUnique1643920577357 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
