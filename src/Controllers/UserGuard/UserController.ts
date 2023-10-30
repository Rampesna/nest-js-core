import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserJwtGuard } from '../../Guards/User/UserJwtGuard';
import { UserService } from '../../Services/TypeOrm/UserService';

@ApiBearerAuth()
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(UserJwtGuard)
  @ApiTags('User')
  @Get('user/user/getAll')
  async getAll(@Res() response: Response) {
    const serviceResponse = await this.userService.getAll();
    return response.status(serviceResponse.Status).json(serviceResponse);
  }
}
