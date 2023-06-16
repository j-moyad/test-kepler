import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from "./users/user.entity";

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
              type: 'postgres',
              host: configService.get('DB_HOST'),
              port: +configService.get<number>('DB_PORT'),
              username: configService.get('DB_USERNAME'),
              password: configService.get('DB_PASSWORD'),
              database: configService.get('DB_NAME'),
              entities: [User],
              synchronize: true
          }),
          inject: [ConfigService]
      }),
      MailerModule.forRootAsync({
          useFactory: (configService: ConfigService) => ({
              transport: configService.get('MAILER_TRANSPORT'),
              defaults: {
                  from: configService.get('MAILER_SENDER'),
              },
              template: {
                  dir: __dirname + '/templates',
                  adapter: new PugAdapter(),
                  options: {
                      strict: true,
                  },
              },
          }),
          inject: [ConfigService]
      }),
      UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
