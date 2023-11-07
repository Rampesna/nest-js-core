import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from '../Config/MongoseConfig';
import { AuthController } from '../Controllers/UserGuard/AuthController';
import { UserModel, UserSchema } from '../Models/Mongoose/User/UserModel';
import { UserModel as UserModelTypeOrm } from '../Models/TypeOrm/UserModel';
import { UserJwtStrategy } from '../Strategies/UserGuard/UserJwtStrategy';
import { UserJwtGuard } from '../Guards/User/UserJwtGuard';
import { UserController } from '../Controllers/UserGuard/UserController';
import { UserService } from '../Services/Mongoose/UserService';
import { JwtService } from '../Services/Mongoose/JwtService';
import {
  JwtTokenModel,
  JwtTokenSchema,
} from '../Models/Mongoose/JwtToken/JwtTokenModel';
import {
  CustomerRepresentationModel,
  CustomerRepresentationSchema,
} from '../Models/Mongoose/CustomerRepresentation/CustomerRepresentationModel';
import { CustomerRepresentationModel as CustomerRepresentationModelTypeOrm } from '../Models/TypeOrm/CustomerRepresentationModel';
import { WebSocketModule } from '../WebSocket/Core/WebSocketModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSourceOptions from '../Config/TypeOrmConfig';
import { JwtModel } from '../Models/TypeOrm/JwtModel';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([
      UserModelTypeOrm,
      JwtModel,
      CustomerRepresentationModelTypeOrm,
    ]),
    MongooseModule.forRootAsync(mongooseConfig),
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      {
        name: CustomerRepresentationModel.name,
        schema: CustomerRepresentationSchema,
      },
    ]),
    MongooseModule.forFeature([
      { name: JwtTokenModel.name, schema: JwtTokenSchema },
    ]),
    WebSocketModule,
  ],
  controllers: [AuthController, UserController],
  providers: [UserService, JwtService, UserJwtGuard, UserJwtStrategy],
})
export class App {}
