import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../../Models/TypeOrm/UserModel';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import ServiceResponse from '../../Core/ServiceResponse';
import * as bcrypt from 'bcrypt';
import { JwtService } from './JwtService';
import { IUserService } from '../../Interfaces/IUserService';

@Injectable()
export class UserService
  extends TypeOrmQueryService<UserModel>
  implements IUserService
{
  constructor(
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
    private jwtService: JwtService,
  ) {
    super(userRepository, {
      useSoftDelete: true,
    });
  }

  async getAll() {
    const users = await this.userRepository.find();

    return new ServiceResponse(true, 'All users', users, 200);
  }

  async getByID(id: string | number): Promise<ServiceResponse> {
    return new ServiceResponse(
      true,
      'Get user by id',
      await this.userRepository.findOne({
        where: {
          id: parseInt(id.toString()),
        },
        relations: {},
      }),
      200,
    );
  }

  async login(email: string, password: string): Promise<ServiceResponse> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const jwtResponse = await this.jwtService.create(
          'user',
          user.id.toString(),
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
    const checkEmailAlreadyExists = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (checkEmailAlreadyExists) {
      return new ServiceResponse(false, 'Email already exists', null, 400);
    }
    const userModel = new UserModel();
    userModel.name = name;
    userModel.email = email;
    userModel.password = bcrypt.hashSync(password, 10);

    const createdUser = await this.userRepository.save(userModel);

    const jwtResponse = await this.jwtService.create(
      'user',
      createdUser.id.toString(),
      null,
    );

    return new ServiceResponse(
      true,
      'Created user',
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
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id.toString()),
      },
    });
    if (!user) {
      return new ServiceResponse(false, 'User not found', null, 404);
    }
    user.name = name;
    user.email = email;
    user.password = bcrypt.hashSync(password, 10);

    const updatedUser = await this.userRepository.save(user);

    return new ServiceResponse(true, 'Updated user', updatedUser, 200);
  }
  async delete(id: string | number): Promise<ServiceResponse> {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id.toString()),
      },
    });
    if (!user) {
      return new ServiceResponse(false, 'User not found', null, 404);
    }
    await this.userRepository.softDelete(id);
    return new ServiceResponse(true, 'User deleted', null, 200);
  }
}
