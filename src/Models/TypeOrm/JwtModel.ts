import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('json_web_tokens')
export class JwtModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tokenable_type: string;

  @Column()
  tokenable_id: string;

  @Column()
  token: string;

  @Column({
    nullable: true,
  })
  expires_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
