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
import ServiceResponse from "../Utils/ServiceResponse";

@Injectable()
export class UserService extends TypeOrmQueryService<UserModel> {

    constructor(
        @InjectRepository(UserModel)
        private userRepository: Repository<UserModel>
    ) {
        super(userRepository, {
            useSoftDelete: true
        });
    }

    async login(
        email: string,
        password: string
    ) {
        let user = await this.userRepository.findOne({
            where: {
                email: email
            }
        });
        return user;
        if (user) {
            if (user.password === password) {
                return new ServiceResponse(
                    true,
                    "Login successful",
                    user,
                    200
                );
            } else {
                return new ServiceResponse(
                    false,
                    "Incorrect password",
                    null,
                    400
                );
            }
        } else {
            return new ServiceResponse(
                false,
                "User not found",
                null,
                404
            );
        }
    }

    getAll() {
        return this.userRepository.find();
    }

    // @ts-ignore
    getById(GetByIdRequest: GetByIdRequest) {
        // @ts-ignore
        return this.userRepository.findOne({
            where: {
                id: GetByIdRequest.id
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
