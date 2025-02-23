import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT ?? 4000;
    app.enableCors();
    await app.listen(port);
    console.log(`🚀 Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error('❌ Error starting the server:', error);
    process.exit(1);
  }
}

void bootstrap();
