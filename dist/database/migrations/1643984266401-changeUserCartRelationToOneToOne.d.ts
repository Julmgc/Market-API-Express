import { MigrationInterface, QueryRunner } from "typeorm";
export declare class changeUserCartRelationToOneToOne1643984266401 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
