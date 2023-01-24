import { Controller, Get, Post, Put, Body, Delete } from "@nestjs/common";
import { UserService } from "../Services/UserService";
import { LoginRequest } from "../Requests/UserController/LoginRequest";
import { GetAllRequest } from "../Requests/UserController/GetAllRequest";
import { GetByIdRequest } from "../Requests/UserController/GetByIdRequest";
import { CreateRequest } from "../Requests/UserController/CreateRequest";
import { UpdateRequest } from "../Requests/UserController/UpdateRequest";
import { DeleteRequest } from "../Requests/UserController/DeleteRequest";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @Post("login")
    login(@Body() LoginRequest: LoginRequest) {
        return this.userService.login(LoginRequest.email, LoginRequest.password);
    }

    @Get("getAll")
    getAll() {
        return this.userService.getAll();
    }

    @Get("getById")
    getById(@Body() GetByIdRequest: GetByIdRequest) {
        return this.userService.getById(GetByIdRequest);
    }

    @Post("create")
    create(@Body() CreateRequest: CreateRequest) {
        return this.userService.create(CreateRequest);
    }

    @Put("update")
    update(@Body() UpdateRequest: UpdateRequest) {
        return this.userService.update(UpdateRequest);
    }

    @Delete("delete")
    delete(@Body() DeleteRequest: DeleteRequest) {
        return this.userService.delete(DeleteRequest);
    }
}
