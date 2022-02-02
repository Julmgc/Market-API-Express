import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import User from "./User";
import CartProduct from "./CartProduct";
import { Expose } from "class-transformer";

@Entity("carts")
export default class Cart {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdOn!: Date;

  @UpdateDateColumn()
  updatedOn!: Date;

  @OneToOne((type) => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart, {
    eager: true,
  })
  products: CartProduct[];

  @Expose({ name: "subtotal" })
  getSubtotal(): number {
    const subtotal = this.products.reduce(
      (acc, actual) => acc + Number(actual.product.price),
      0
    );

    return subtotal;
  }
}
