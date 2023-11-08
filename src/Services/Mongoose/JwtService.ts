import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  JwtTokenDocument,
  JwtTokenModel,
} from '../../Models/Mongoose/JwtToken/JwtTokenModel';
import { sign, verify } from 'jsonwebtoken';

import ServiceResponse from '../../Core/ServiceResponse';
import { UserDocument, UserModel } from '../../Models/Mongoose/User/UserModel';
import {
  CustomerRepresentationDocument,
  CustomerRepresentationModel,
} from '../../Models/Mongoose/CustomerRepresentation/CustomerRepresentationModel';
import { IJwtService } from '../../Interfaces/IJwtService';

@Injectable()
export class JwtService implements IJwtService {
  constructor(
    @InjectModel(JwtTokenModel.name)
    private jwtTokenModel: Model<JwtTokenDocument>,
    @InjectModel(UserModel.name)
    private userModel: Model<UserDocument>,
    @InjectModel(CustomerRepresentationModel.name)
    private customerRepresentationModel: Model<CustomerRepresentationDocument>,
  ) {}

  async create(
    tokenableType: string,
    tokenableId: string | number,
    expiresAt?: Date,
  ): Promise<ServiceResponse> {
    const token = sign(
      {
        tokenableType: tokenableType,
        tokenableId: tokenableId,
        expiresAt: expiresAt,
      },
      process.env.JWT_SECRET,
    );
    const jwtTokenModel = new this.jwtTokenModel({
      tokenableType: tokenableType,
      tokenableId: tokenableId,
      token: token,
      expiresAt: expiresAt,
    });

    const createdJwt = await jwtTokenModel.save();

    return new ServiceResponse(true, 'Created JWT', createdJwt, 200);
  }

  async verifyToken(token: string): Promise<ServiceResponse> {
    const jwtToken = await this.jwtTokenModel.findOne({
      token: token,
    });
    if (jwtToken) {
      try {
        const verifiedToken: any = await verify(token, process.env.JWT_SECRET);

        if (verifiedToken.tokenableType === 'user') {
          verifiedToken.tokenable = await this.userModel.findOne({
            _id: (verifiedToken.tokenableId as string) ?? '',
          });
        }

        if (verifiedToken.tokenableType === 'customerRepresentation') {
          verifiedToken.tokenable =
            await this.customerRepresentationModel.findOne({
              _id: (verifiedToken.tokenableId as string) ?? '',
            });
        }

        return new ServiceResponse(true, 'Verified token', verifiedToken, 200);
      } catch (e) {
        return new ServiceResponse(false, "Couldn't verify token", null, 404);
      }
    } else {
      return new ServiceResponse(false, 'Token is not found', null, 404);
    }
  }

  async verifyPayload(
    tokenableType: string,
    tokenableId: string | number,
  ): Promise<ServiceResponse> {
    let tokenable = {};
    if (tokenableType === 'user') {
      tokenable = await this.userModel.findOne({
        _id: tokenableId.toString(),
      });
    }

    if (tokenableType === 'customerRepresentation') {
      tokenable = await this.customerRepresentationModel.findOne({
        _id: tokenableId.toString(),
      });
    }

    return new ServiceResponse(true, 'Verified payload', tokenable, 200);
  }
}
