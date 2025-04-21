import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { OrganizationUsers } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationUsers])],
  controllers: [UsersController],
  providers: [UsersService],

  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}