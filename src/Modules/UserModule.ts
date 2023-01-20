import { Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModel} from "../Models/TypeOrm/UserModel";
import {UserService} from "../Services/UserService";
import {UserController} from "../Controllers/UserController";
import {JwtService} from "../Services/JwtService";
import {JwtModel} from "../Models/TypeOrm/JwtModel";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserModel,
            JwtModel
        ])
    ],
    providers: [
        UserService,
        JwtService
    ],
    controllers: [
        UserController
    ],
    exports: [
        UserService
    ],
})
export class UserModule{}
