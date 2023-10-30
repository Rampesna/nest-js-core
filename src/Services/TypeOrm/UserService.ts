import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../../Models/TypeOrm/UserModel';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import ServiceResponse from '../../Core/ServiceResponse';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { JwtService } from './JwtService';

@Injectable()
export class UserService extends TypeOrmQueryService<UserModel> {
  constructor(
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
    private jwtService: JwtService,
  ) {
    super(userRepository, {
      useSoftDelete: true,
    });
  }

  async login(email: string, password: string) {
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

  async create(name: string, email: string, password: string) {
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

  async getAll() {
    const users = await this.userRepository.find();

    return new ServiceResponse(true, 'All users', users, 200);
  }

  async getByID(id: number) {
    return new ServiceResponse(
      true,
      'Get user by id',
      await this.userRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          // todos: true
        },
      }),
      200,
    );
  }
}
