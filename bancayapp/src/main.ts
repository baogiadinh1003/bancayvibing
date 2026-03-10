import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // global input validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = config.get<number>('PORT') || 3000;
  const prefix = `${config.get<string>('BASE_API_PREFIX')}/v${config.get<string>('API_VERSION')}`;
  app.setGlobalPrefix(prefix);

  // swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Auto-generated Swagger docs')
    .setVersion(config.get<string>('API_VERSION') || '1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  console.log(`🟢 Application is running on: http://localhost:${port}/${prefix}`);
  console.log(`📄 Swagger available at: http://localhost:${port}/docs`);
}
bootstrap();
