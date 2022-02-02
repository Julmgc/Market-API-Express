import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserCartProduct1643837257559 implements MigrationInterface {
    name = 'createUserCartProduct1643837257559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "userCart" uuid`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_8f18d81401b3d57b91635dc78ff" PRIMARY KEY ("id", "cartId")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "cartId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "REL_2b691a1a15a9cc3e1ddfa9f5ff" UNIQUE ("userId", "userCart")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_2b691a1a15a9cc3e1ddfa9f5fff" FOREIGN KEY ("userId", "userCart") REFERENCES "users"("id","cartId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_2b691a1a15a9cc3e1ddfa9f5fff"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "REL_2b691a1a15a9cc3e1ddfa9f5ff"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "cartId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_8f18d81401b3d57b91635dc78ff"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "userCart"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
