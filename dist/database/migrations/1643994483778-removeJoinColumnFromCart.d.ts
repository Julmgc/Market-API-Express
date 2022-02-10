import { MigrationInterface, QueryRunner } from "typeorm";
export declare class removeJoinColumnFromCart1643994483778 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
