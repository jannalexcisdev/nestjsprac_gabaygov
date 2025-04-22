import { Controller, Get } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';
import { UpdateEventDto } from './dto/update-event.dto';


@Controller('events')
export class EventsController {

    constructor(private readonly eventsService: EventsService) {}

    @Get()
    test() {
      return { message: 'EventsController is working!' };
    }

    @Get()
    findAll() {
      return 'This is the events endpoint';
    }
  
}
