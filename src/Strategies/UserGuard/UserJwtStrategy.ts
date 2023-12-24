import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { IJwtService } from '../../Interfaces/IJwtService';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(
  Strategy,
  'UserJwtGuard',
) {
  constructor(
    @Inject('IJwtService')
    private readonly jwtService: IJwtService,
  ) {
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
