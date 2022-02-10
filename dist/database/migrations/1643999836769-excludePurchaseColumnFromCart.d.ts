import { MigrationInterface, QueryRunner } from "typeorm";
export declare class excludePurchaseColumnFromCart1643999836769 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
