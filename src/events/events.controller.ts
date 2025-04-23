import { Controller, Get, Post, Patch, Param, Delete, ParseIntPipe, ValidationPipe, Body, Query } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';
import { UpdateEventDto } from './dto/update-event.dto';


@Controller('events')
export class EventsController {

  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create_event(@Body(ValidationPipe) createEventDto:CreateEventDto) {
    return this.eventsService.create_event(createEventDto)
  }

  @Get(':id')
  get_event(@Param('id', ParseIntPipe)id:number) {
    return this.eventsService.get_event(id)
  }

  @Get()
  get_events(
    @Query('title') title?: string,
    @Query('location') location?:string
  ) {
    return this.eventsService.get_events(title, location)
  }

  @Patch(':id')
  update_event(@Param('id', ParseIntPipe) id:number, @Body(ValidationPipe) updateEventDto:UpdateEventDto) {
    return this.eventsService.update_event(id, updateEventDto)
  }

  @Delete(':id') 
  delete_event(@Param('id', ParseIntPipe) id:number) {
    return this.eventsService.delete_event(id)
  }
  
}
