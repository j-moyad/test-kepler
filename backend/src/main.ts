import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FileLogger } from "./logger/file-logger.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true
    });

    app.enableCors({
        'origin': [/https?:\/\/(localhost|127.0.0.1)(:\d*)?/],
        'methods': 'POST',
        'preflightContinue': false,
        'optionsSuccessStatus': 204
    });

    app.useLogger(new FileLogger());

    await app.listen(3001);
}
bootstrap();
