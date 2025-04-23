import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Events } from './entities/events.entity';
import { ILike } from 'typeorm';


@Injectable()
export class EventsService {

  constructor (
    @InjectRepository(Events)
    private readonly eventRepository: Repository<Events>) {}

  async create_event(createEventDto: CreateEventDto) {
    const new_event = this.eventRepository.create(createEventDto)
    return await this.eventRepository.save(new_event)
  }

  async get_event(id:number) {
    const find_event =  this.eventRepository.findOne({where :{ id }})
    if (!find_event) throw new NotFoundException('User Not Found')
    return find_event
  }

  async get_events(title?:string, location?:string) {
    const conditions: any = {};
    if (title) conditions.title = ILike (`%${title}%`);
    if (location) conditions.location = ILike (`%${location}%`);

    const find_event = await this.eventRepository.find({where: conditions})

    if (!find_event.length) throw new NotFoundException('Event Not Found')
    return find_event;
  }

  async update_event(id:number, updateEventDto: UpdateEventDto) {
    const find_event = await this.eventRepository.findOne({where: {id}})
    if (!find_event) throw new NotFoundException (`The event with id number ${id} is not found`)
    return  this.eventRepository.update(id, updateEventDto)
  }

  async delete_event(id: number) {
    const find_event = await this.get_event(id);
    if (!find_event) throw new NotFoundException('Event Not Found')
    return this.eventRepository.remove(find_event)
  }
}
