import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserModel } from "../Models/TypeOrm/UserModel";

import { GetAllRequest } from "../Requests/UserController/GetAllRequest";
import { GetByIdRequest } from "../Requests/UserController/GetByIdRequest";
import { CreateRequest } from "../Requests/UserController/CreateRequest";
import { UpdateRequest } from "../Requests/UserController/UpdateRequest";
import { DeleteRequest } from "../Requests/UserController/DeleteRequest";
import { TypeOrmQueryService } from "@nestjs-query/query-typeorm";

@Injectable()
export class UserService extends TypeOrmQueryService<UserModel> {

    constructor(
        @InjectRepository(UserModel)
        private usersRepository: Repository<UserModel>
    ) {
        super(usersRepository, {
            useSoftDelete: true
        });
    }

    getAll(GetAllRequest: GetAllRequest) {
        return this.usersRepository.find();
    }

    // @ts-ignore
    getById(
        id: number
    ) {
        // @ts-ignore
        return this.usersRepository.findOne({
            where: {
                id: id
            },
            relations: {
                todos: true
            }
        });
    }

    create(CreateRequest: CreateRequest) {
        return `Create user`;
    }

    update(UpdateRequest: UpdateRequest) {
        return `Update user`;
    }

    delete(DeleteRequest: DeleteRequest) {
        return `Delete user`;
    }
}
