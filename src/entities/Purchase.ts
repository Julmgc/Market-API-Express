import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
  Unique,
} from "typeorm";
import User from "./User";

@Entity("purchases")
export default class Purchase {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdOn!: Date;

  @Column("jsonb")
  products: [];
}
