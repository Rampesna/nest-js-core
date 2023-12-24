import { Controller, Get, Inject, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserJwtGuard } from '../../Guards/User/UserJwtGuard';
import { IUserService } from '../../Interfaces/IUserService';

@ApiBearerAuth()
@Controller()
export class UserController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}
  @UseGuards(UserJwtGuard)
  @ApiTags('User')
  @Get('user/user/getAll')
  async getAll(@Res() response: Response) {
    const serviceResponse = await this.userService.getAll();
    return response.status(serviceResponse.Status).json(serviceResponse);
  }
}
