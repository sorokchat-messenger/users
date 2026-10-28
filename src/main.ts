import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module.js';
import { type AllConfigs, ConfigModule } from './infrastructure/index.js';
import { createServer, createUsersService } from '@sorokchat-messenger/microservices';
import { Logger } from '@nestjs/common';
import { DomainExceptionFilter } from './presentation/index.js';

async function bootstrap() {
  const context = await NestFactory.createApplicationContext(ConfigModule);
  const config = context.get<ConfigService<AllConfigs>>(ConfigService);
  const host = config.getOrThrow("grpc.host", { infer: true });
  const port = config.getOrThrow("grpc.port", { infer: true });
  const logger = new Logger("gRPC Users Service");
  await context.close();
  const url: string = `${host}:${port}`;
  const application = await createServer(AppModule, createUsersService(url));
  application.enableShutdownHooks();
  application.useGlobalFilters(new DomainExceptionFilter());
  logger.log("Starting...");
  await application.listen();
  logger.log(`Started on ${url}`)
}
await bootstrap();
