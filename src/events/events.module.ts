import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Events } from './entities/events.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Events])],
  controllers: [EventsController],
  providers: [EventsService],
  
  exports: [EventsService, TypeOrmModule],
})
export class EventsModule {}
