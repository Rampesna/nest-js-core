import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import ServiceResponse from '../../Core/ServiceResponse';
import { UserDocument, UserModel } from '../../Models/Mongoose/User/UserModel';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { IUserService } from '../../Interfaces/IUserService';
import { IJwtService } from '../../Interfaces/IJwtService';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
    @Inject('IJwtService')
    private jwtService: IJwtService,
  ) {}

  async getAll(): Promise<ServiceResponse> {
    return new ServiceResponse(
      true,
      'All users',
      await this.userModel.find().exec(),
      200,
    );
  }

  async getByID(id: string): Promise<ServiceResponse> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      return new ServiceResponse(false, 'User not found', null, 404);
    }
    return new ServiceResponse(true, 'User found', user, 200);
  }

  async login(email: string, password: string): Promise<ServiceResponse> {
    const user = await this.userModel.findOne({
      email: email,
    });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const jwtResponse = await this.jwtService.create(
          'user',
          user._id.toString(),
          null,
        );
        return new ServiceResponse(
          true,
          'Login successful',
          {
            token: jwtResponse.Data.token,
          },
          200,
        );
      } else {
        return new ServiceResponse(false, 'Incorrect password', null, 400);
      }
    } else {
      return new ServiceResponse(false, 'User not found', null, 404);
    }
  }

  async create(
    name: string,
    email: string,
    password: string,
  ): Promise<ServiceResponse> {
    const checkEmailAlreadyExists = await this.userModel.findOne({
      email: email,
    });
    if (checkEmailAlreadyExists) {
      return new ServiceResponse(false, 'Email already exists', null, 400);
    }
    const userModel = new this.userModel({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 10),
    });

    const createdUser = await userModel.save();

    const jwtResponse = await this.jwtService.create(
      'user',
      createdUser._id.toString(),
      null,
    );

    return new ServiceResponse(
      true,
      'User created',
      {
        token: jwtResponse.Data.token,
      },
      200,
    );
  }

  async update(
    id: string | number,
    name: string,
    email: string,
    password: string,
  ): Promise<ServiceResponse> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      return new ServiceResponse(false, 'User not found', null, 404);
    }
    user.name = name;
    user.email = email;
    user.password = bcrypt.hashSync(password, 10);
    const updatedUser = await user.save();
    return new ServiceResponse(true, 'User updated', updatedUser, 200);
  }

  async delete(id: string | number): Promise<ServiceResponse> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      return new ServiceResponse(false, 'User not found', null, 404);
    }
    await user.deleteOne();
    return new ServiceResponse(true, 'User deleted', null, 200);
  }
}
