import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, OneToMany, JoinColumn } from "typeorm";
import { TodoModel } from "./TodoModel";

@Entity("json_web_tokens")
export class JwtModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tokenable_type: string;

    @Column()
    tokenable_id: string;

    @Column()
    token: string;

    @Column()
    expires_at: Date;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}

