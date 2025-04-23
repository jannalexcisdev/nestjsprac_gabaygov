import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
    try{
      const event = this.eventRepository.create(createEventDto)
      return await this.eventRepository.save(event)
    } catch (error) {
      throw new InternalServerErrorException('Failed to Create Event')
    }
  }

  async get_event(id:number) {
    try {
      const find_event =  await this.eventRepository.findOne({where :{ id }})
      if (!find_event) {
        throw new NotFoundException('Event Not Found')
      }
      return find_event
    } catch (error) {
      throw new InternalServerErrorException ('Failed to Retrieve Event')
    }
  }

  async get_events(title?:string, location?:string) {
    try {
      const conditions: any = {};
      if (title) conditions.title = ILike (`%${title}%`);
      if (location) conditions.location = ILike (`%${location}%`);
      const event = await this.eventRepository.find({where: conditions})
      if (!event.length) {
        throw new NotFoundException('No Events Found')
      }
      return event;
    } catch (error) {
      throw new InternalServerErrorException ('Failed to retrieve events')
    }
  }

  async update_event(id:number, updateEventDto: UpdateEventDto) {
    try {
      const event = await this.eventRepository.findOne({where: {id}})
      if (!event) {
        throw new NotFoundException ('Event Not Found')
      }
      Object.assign(event, updateEventDto);
      return this.eventRepository.save(event)
    } catch (error) {
      throw new InternalServerErrorException ('Failed to Update Event')
    }
  }

  async delete_event(id: number) {
    try {
      const event = await this.get_event(id);
      return this.eventRepository.remove(event)
    } catch (error) {
      throw new InternalServerErrorException ('Failed to Delete Event')
    }
  }
}
