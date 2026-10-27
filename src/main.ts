import { NestFactory } from '@nestjs/core';
import { PresentationModule } from './presentation/index.js';

async function bootstrap() {
  const app = await NestFactory.create(PresentationModule);
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
