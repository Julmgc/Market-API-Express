import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  Column,
} from "typeorm";
import User from "./User";

@Entity("codes")
export default class Code {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_Id: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  code: string;
}
