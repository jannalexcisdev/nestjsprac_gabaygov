import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationUsers } from './users/entities/users.entity';
import { Events } from './events/entities/events.entity';
import { EmailsModule } from './emails/emails.module';
import { SubscriptionEmails } from './emails/entities/emails.entity';
import { AssetsModule } from './assets/assets.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, EventsModule, SubscriptionEmails,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type:'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [OrganizationUsers, Events, SubscriptionEmails],
        synchronize:true
      })
    }),
    EmailsModule,
    AssetsModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
