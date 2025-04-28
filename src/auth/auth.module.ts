import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationUsers } from 'src/users/entities/users.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/LocalStrategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([OrganizationUsers]),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [ AuthService,
    {
    provide:'AUTH_SERVICE',
    useClass:AuthService,
  },
  {
    provide: 'USER_SERVICE',
    useClass:UsersService,
  },
  LocalStrategy,
],
})
export class AuthModule {}