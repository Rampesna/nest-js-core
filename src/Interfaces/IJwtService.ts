import ServiceResponse from '../Core/ServiceResponse';

export interface IJwtService {
  create(
    tokenableType: string,
    tokenableId: string | number,
    expiresAt?: Date,
  ): Promise<ServiceResponse>;

  verifyToken(token: string): Promise<ServiceResponse>;

  verifyPayload(
    tokenableType: string,
    tokenableId: string | number,
  ): Promise<ServiceResponse>;
}
