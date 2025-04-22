import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';


@Entity({name: 'events'})
export class Events {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'varchar', length: 100})
    title: string;

    @Column('timestamp')
    datetime: Date;

    @Column ({type: 'varchar', length: 100})
    location: string;

    @Column({type: 'varchar', length: 100})
    photo: string;

    @Column({type: 'varchar', length: 100})
    description: String;
}
