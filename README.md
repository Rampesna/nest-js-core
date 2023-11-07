# NestJsCore

NestJsCore is open sourced project that provides a core for NestJs applications. It is based
on [NestJs](https://nestjs.com/) framework and provides a set of features that are common for most of the applications.
This framework is designed to be used as a core for your application. It provides a set of features that are common for
most of the applications.

This framework supportting the following features:

- [x] [Authentication](https://docs.nestjs.com/security/authentication)
- [x] [Authorization](https://docs.nestjs.com/security/authorization)
- [x] [Caching](https://docs.nestjs.com/techniques/caching)
- [x] [Configuration](https://docs.nestjs.com/techniques/configuration)
- [x] [CORS](https://docs.nestjs.com/security/cors)
- [x] [CSRF](https://docs.nestjs.com/security/csrf)
- [x] [MongoDB](https://docs.nestjs.com/techniques/mongodb)
- [x] [TypeORM](https://docs.nestjs.com/techniques/database)
- [x] [Validation](https://docs.nestjs.com/techniques/validation)
- [x] [Swagger](https://docs.nestjs.com/openapi/introduction)
- [x] [WebSockets](https://docs.nestjs.com/websockets/gateways)

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Test Endpoints

### Register

```shell
curl --location --request POST 'http://HOST:PORT/api/user/auth/register' \
--header 'Accept: application/json' \
--data-raw '{"email": "example@email.com", "password": "password"}'
```

### Login

```shell
curl --location --request POST 'http://HOST:PORT/api/user/auth/login' \
--header 'Accept: application/json' \
--data-raw '{"email": "example@email.com", "password": "password"}'
```

### Get All Users

```shell
curl --location --request GET 'http://HOST:PORT/api/user/user/getAll' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer tokenFromLoginRequest' \
--data-raw ''
```

## Support

NestJsCore is an MIT-licensed open source project built with using [NestJs](https://nestjs.com/). It can grow thanks to
the sponsors and support by the amazing backers.

## License

NestJsCore [MIT licensed](LICENSE).
