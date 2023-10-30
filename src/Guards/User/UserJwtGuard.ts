import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserJwtGuard extends AuthGuard('UserJwtGuard') {
  handleRequest(err, user, info, context) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    context.switchToHttp().getRequest().client = user;

    return user;
  }
}
