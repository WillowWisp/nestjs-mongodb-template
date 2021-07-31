import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './controller/filters/all-exception.filter';
import { AppExceptionFilter } from './controller/filters/app-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionFilter(), new AppExceptionFilter());

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Thang NestJS-MongoDB Template')
    .setDescription('With some fancy description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}
