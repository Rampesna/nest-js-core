import { NestFactory } from '@nestjs/core';
import { App } from './Core/App';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './Exceptions/ValidationExceptionFilter';
import { UnauthenticatedExceptionFilter } from './Exceptions/UnauthenticatedExceptionFilter';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(App);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalFilters(new UnauthenticatedExceptionFilter());
  app.setGlobalPrefix('api');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('CRM API Documentation')
    .setDescription('CRM API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };
  const document = SwaggerModule.createDocument(app, swaggerConfig, options);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      defaultModelsExpandDepth: -1,
    },
  });
  SwaggerModule.setup('api', app, document);
  await app.listen(3005);
}
bootstrap();
