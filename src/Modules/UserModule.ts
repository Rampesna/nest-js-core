import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel } from "../Models/TypeOrm/UserModel";

@Module({
    imports: [TypeOrmModule.forFeature([UserModel])],
    exports: [TypeOrmModule],
})
export class UserModule {
}
