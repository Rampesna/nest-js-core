import {MiddlewareConsumer, Module, NestModule, RequestMethod} from "@nestjs/common";
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from "@nestjs/typeorm";
import dataSourceOptions from "../Config/TypeOrmConfig";
import {UserModule} from "../Modules/UserModule";
import {JwtModel} from "../Models/TypeOrm/JwtModel";
import {JwtService} from "../Services/JwtService";
import {AuthMiddleware} from "../Middlewares/AuthMiddleware";

@Module({
    imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        TypeOrmModule.forFeature([
            JwtModel
        ]),
        ConfigModule.forRoot(),
        UserModule,
    ],
    providers: [
        JwtService
    ]
})

export class App implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(
            AuthMiddleware
        ).exclude(
            {
                path: "user/login",
                method: RequestMethod.POST
            }
        ).forRoutes("*");
    }
}
