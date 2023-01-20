import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserHttpModule } from "../HttpModules/UserHttpModule";
import dataSourceOptions from "../Config/TypeOrmConfig";

@Module({
    imports: [
        UserHttpModule,
        TypeOrmModule.forRoot(dataSourceOptions)
    ]
})

export class App {}
