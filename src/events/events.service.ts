import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Events } from './entities/events.entity';


@Injectable()
export class EventsService {

    constructor (
        @InjectRepository(Events)
        private readonly usersRepository: Repository<Events>) {}
}
