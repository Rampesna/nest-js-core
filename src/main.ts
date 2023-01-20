import { NestFactory } from "@nestjs/core";
import { App } from "./Core/App";
import { ValidationPipe } from "@nestjs/common";
import { ValidationExceptionFilter } from "./Exceptions/ValidationExceptionFilter";


async function bootstrap() {
    const app = await NestFactory.create(App);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new ValidationExceptionFilter());
    await app.listen(3005);
}

bootstrap();
