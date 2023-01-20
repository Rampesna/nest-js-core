import { NestFactory } from '@nestjs/core';
import { App } from './Core/App';

async function bootstrap() {
  const app = await NestFactory.create(App);
  await app.listen(3005);
}
bootstrap();
