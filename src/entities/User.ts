import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import Cart from "./Cart";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: "password", select: false })
  password!: string;

  @Column()
  isAdm: boolean;

  @CreateDateColumn()
  createdOn!: Date;

  @UpdateDateColumn()
  updatedOn!: Date;

  @OneToMany(() => Cart, (cart) => cart.user, {
    nullable: true,
    primary: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "cartId",
  })
  carts?: Cart;
}
