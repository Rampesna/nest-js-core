import { Controller, Post, Body, Res, Inject } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { LoginRequest } from '../../Requests/UserGuard/UserController/LoginRequest';
import { RegisterRequest } from '../../Requests/UserGuard/UserController/RegisterRequest';
import { IUserService } from '../../Interfaces/IUserService';

@Controller()
export class AuthController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}

  @ApiTags('Authentication')
  @Post('user/auth/login')
  async login(@Body() loginRequest: LoginRequest, @Res() response: Response) {
    const serviceResponse = await this.userService.login(
      loginRequest.email,
      loginRequest.password,
    );
    return response.status(serviceResponse.Status).json(serviceResponse);
  }

  @ApiTags('Authentication')
  @Post('user/auth/register')
  async register(
    @Body() registerRequest: RegisterRequest,
    @Res() response: Response,
  ) {
    const serviceResponse = await this.userService.create(
      registerRequest.name,
      registerRequest.email,
      registerRequest.password,
    );
    response.status(serviceResponse.Status).json(serviceResponse);
  }
}
