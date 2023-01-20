import { Module } from "@nestjs/common";
import { UserModule } from "../Modules/UserModule";
import { UserController } from "../Controllers/UserController";
import { UserService } from "../Services/UserService";

@Module({
    imports: [UserModule],
    controllers: [UserController],
    providers: [UserService]
})
export class UserHttpModule {
}
