import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import User from "./User";
import OrderProduct from "./OrderProduct";
import { Expose } from "class-transformer";

@Entity("orders")
export default class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdOn!: Date;

  @Column()
  Done!: boolean;

  @Column()
  userId: string;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    eager: true,
  })
  products!: OrderProduct[];

  @Expose({ name: "total" })
  getTotal(): number {
    const total = this.products.reduce(
      (acc, actual) => acc + Number(actual.product.price),
      0
    );

    return total;
  }
}
