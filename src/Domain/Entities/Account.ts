import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  balance: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
