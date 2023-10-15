import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../../../users/infra/typeorm/entities/User';

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
