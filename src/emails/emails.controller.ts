import { Controller, Post, Delete, ValidationPipe, Body, ParseIntPipe, Param} from '@nestjs/common';
import { InputEmailDto } from './dto/input-email.dto';
import { EmailsService } from './emails.service';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService:EmailsService) { }

  @Post()
  add_email(@Body(ValidationPipe) inputEmailDto:InputEmailDto) {
    return this.emailsService.create_email(inputEmailDto)
  }

  @Delete(':id')
  remove_email(@Param('id', ParseIntPipe )id:number) {
    return this.emailsService.delete_email(id)
  }

}
