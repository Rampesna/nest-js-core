import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users')
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  created_at: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updated_at: Date;

  @DeleteDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  deleted_at: Date;
}
