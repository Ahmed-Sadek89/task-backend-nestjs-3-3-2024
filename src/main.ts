import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [process.env.FRONTEND_DEPLOYED_LINK, process.env.FRONTEND_DEVELOPMENT_LINK], // Allow these origins
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    exposedHeaders: ['Authorization'], // Expose these headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  });
  await app.listen(4000);
}
bootstrap();
