import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtService } from '../../Services/Mongoose/JwtService';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(
  Strategy,
  'UserJwtGuard',
) {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'crm',
    });
  }

  async validate(payload: any) {
    // return payload;
    const jwtResponse = await this.jwtService.verifyPayload(
      payload.tokenableType,
      payload.tokenableId,
    );

    return jwtResponse.Data;
  }
}
