import ServiceResponse from '../Core/ServiceResponse';

export interface IUserService {
  getAll(): Promise<ServiceResponse>;

  getById(id: string | number): Promise<ServiceResponse>;

  login(email: string, password: string): Promise<ServiceResponse>;

  create(
    name: string,
    email: string,
    password: string,
  ): Promise<ServiceResponse>;

  update(
    id: string | number,
    name: string,
    email: string,
    password: string,
  ): Promise<ServiceResponse>;

  delete(id: string | number): Promise<ServiceResponse>;
}
