import { UserJwtStrategy } from '../Strategies/UserGuard/UserJwtStrategy';
import { UserJwtGuard } from '../Guards/User/UserJwtGuard';
import { configDotenv } from 'dotenv';

type Provider = {
  provide: string;
  useClass: any;
};

export class InterfaceServiceProvider {
  serviceType: string;
  providerClasses: Array<string>;
  providers: Array<Provider>;

  constructor() {
    this.serviceType = configDotenv().parsed.DB_SERVICE_TYPE;
    this.providerClasses = ['User', 'Jwt'];
    this.providers = [];
    for (const providerClass of this.providerClasses) {
      this.providers.push({
        provide: 'I' + providerClass + 'Service',
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        useClass: require('../Services/' +
          this.serviceType +
          '/' +
          providerClass +
          'Service')[providerClass + 'Service'],
      });
    }
    this.providers.push({
      provide: 'UserJwtStrategy',
      useClass: UserJwtStrategy,
    });
    this.providers.push({
      provide: 'UserJwtGuard',
      useClass: UserJwtGuard,
    });
  }
}
