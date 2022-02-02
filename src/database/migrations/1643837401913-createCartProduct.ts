import {MigrationInterface, QueryRunner} from "typeorm";

export class createCartProduct1643837401913 implements MigrationInterface {
    name = 'createCartProduct1643837401913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart_products" ("id" SERIAL NOT NULL, "productId" integer NOT NULL, "cartId" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3b12299e401712e78753a7b4fec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart_products" ADD CONSTRAINT "FK_1931976f8c2fc77eb13a63c09ae" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_products" ADD CONSTRAINT "FK_3ee3d2f230cd0cda8966be069b4" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_products" DROP CONSTRAINT "FK_3ee3d2f230cd0cda8966be069b4"`);
        await queryRunner.query(`ALTER TABLE "cart_products" DROP CONSTRAINT "FK_1931976f8c2fc77eb13a63c09ae"`);
        await queryRunner.query(`DROP TABLE "cart_products"`);
    }

}
