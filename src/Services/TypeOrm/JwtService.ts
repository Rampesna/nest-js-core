import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtModel } from '../../Models/TypeOrm/JwtModel';
import { sign, verify } from 'jsonwebtoken';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import ServiceResponse from '../../Core/ServiceResponse';
import { UserModel } from '../../Models/TypeOrm/UserModel';
import { CustomerRepresentationModel } from '../../Models/TypeOrm/CustomerRepresentationModel';

@Injectable()
export class JwtService extends TypeOrmQueryService<JwtModel> {
  constructor(
    @InjectRepository(JwtModel)
    readonly jwtRepository: Repository<JwtModel>,
    @InjectRepository(UserModel)
    readonly userRepository: Repository<UserModel>,
    @InjectRepository(CustomerRepresentationModel)
    readonly customerRepresentationRepository: Repository<CustomerRepresentationModel>,
  ) {
    super(jwtRepository, {
      useSoftDelete: true,
    });
  }

  async create(
    tokenableType: string,
    tokenableId: string | number,
    expiresAt?: Date,
  ): Promise<ServiceResponse> {
    const token = sign(
      {
        tokenable_type: tokenableType,
        tokenable_id: parseInt(tokenableId.toString()),
        expires_at: expiresAt,
      },
      process.env.JWT_SECRET,
    );

    const jwtModel = new JwtModel();
    jwtModel.tokenable_type = tokenableType;
    jwtModel.tokenable_id = parseInt(tokenableId.toString());
    jwtModel.token = token;
    jwtModel.expires_at = expiresAt;

    const createdJwt = await this.jwtRepository.save(jwtModel);

    return new ServiceResponse(true, 'Created JWT', createdJwt, 200);
  }

  async verifyToken(token: string): Promise<ServiceResponse> {
    const jwtToken = this.jwtRepository.findOne({
      where: {
        token: token,
      },
    });

    if (jwtToken) {
      try {
        const verifiedToken = verify(token, process.env.JWT_SECRET);
        return new ServiceResponse(true, 'Verified token', verifiedToken, 200);
      } catch (e) {
        return new ServiceResponse(false, 'Could not verify token', null, 404);
      }
    } else {
      return new ServiceResponse(false, 'Token is not valid', null, 404);
    }
  }

  async verifyPayload(
    tokenableType: string,
    tokenableId: string | number,
  ): Promise<ServiceResponse> {
    let tokenable = {};
    if (tokenableType === 'user') {
      tokenable = await this.userRepository.findOne({
        where: {
          id: parseInt(tokenableId.toString()),
        },
      });
    }

    if (tokenableType === 'customerRepresentation') {
      tokenable = await this.customerRepresentationRepository.findOne({
        where: {
          id: parseInt(tokenableId.toString()),
        },
      });
    }

    return new ServiceResponse(true, 'Verified payload', tokenable, 200);
  }
}
