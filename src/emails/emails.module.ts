import { Module } from '@nestjs/common';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { SubscriptionEmails } from './entities/emails.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionEmails])],
  controllers: [EmailsController],
  providers: [EmailsService],
  exports: [ TypeOrmModule],
})
export class EmailsModule {}
