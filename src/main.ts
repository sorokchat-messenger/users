import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const application = await NestFactory.create(AppModule);
  application.enableShutdownHooks();
  await application.listen(process.env.GRPC_PORT ?? 3000);
}
await bootstrap();
