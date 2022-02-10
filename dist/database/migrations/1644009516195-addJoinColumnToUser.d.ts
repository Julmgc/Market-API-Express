import { MigrationInterface, QueryRunner } from "typeorm";
export declare class addJoinColumnToUser1644009516195 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
