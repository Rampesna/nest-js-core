import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserHttpModule } from "../HttpModules/UserHttpModule";
import dataSourceOptions from "../Config/TypeOrmConfig";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";

@Module({
    imports: [
        ConfigModule.forRoot(),
        UserHttpModule,
        TypeOrmModule.forRoot(dataSourceOptions)
    ],
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
