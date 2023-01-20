import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserModel } from "./UserModel";

@Entity("todos")
export class TodoModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => UserModel, (user) => user.todos)
    @JoinColumn({
        name: "user_id"
    })
    user: UserModel;
}

