import { Injectable, InternalServerErrorException, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
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
    
  create_email(inputEmailDto:InputEmailDto) {
    try {
      const new_email = this.emailsRepository.create(inputEmailDto)
      return this.emailsRepository.save(new_email)
    } catch (error) {
      throw new InternalServerErrorException ('Failed to Add Email')
    }
  }

  async delete_email(id:number) {
    try {
      const existing_email = await this.emailsRepository.findOne({where:{id}})
      if (!existing_email) {
        throw new NotFoundException ('Email Not Found')
      }
      return this.emailsRepository.remove(existing_email)
    } catch (error) {
      throw new InternalServerErrorException ('Failed to Delete Email')
    }
  }
}
