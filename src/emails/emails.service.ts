import { Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { InputEmailDto } from './dto/input-email.dto';
import { SubscriptionEmails } from './entities/emails.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'os';

@Injectable()
export class EmailsService {

  constructor (
    @InjectRepository(SubscriptionEmails)
    private readonly emailsRepository: Repository<SubscriptionEmails>) {}
    
  async create_email(inputEmailDto:InputEmailDto) {
    const new_email = this.emailsRepository.create(inputEmailDto)
    return this.emailsRepository.save(new_email)
  }

  async findOne(id:number) {
    return await this.emailsRepository.findOne({where: {id}})
  }

  async delete_email(id:number) {
    const existing_email = await this.findOne(id)
    if (!existing_email) throw new NotFoundException ('Email Not Found')
    return this.emailsRepository.remove(existing_email)
  }

}
