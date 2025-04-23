import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'subscription_emails'})
export class SubscriptionEmails {
  @PrimaryGeneratedColumn()
  id:number;
  
  @Column({unique:true})
  subscriber_email:string;
}