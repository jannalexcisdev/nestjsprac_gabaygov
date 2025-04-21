import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'organization_users'})
export class OrganizationUsers {
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type: 'varchar', length: 100})
  first_name:string;

  @Column({type: 'varchar', length: 100})
  last_name:string;

  @Column({unique:true})
  email:string;  

  @Column({type:'varchar', unique:true})
  username:string;

  @Column()
  password:string;

  @Column()
  government_id:string;
}