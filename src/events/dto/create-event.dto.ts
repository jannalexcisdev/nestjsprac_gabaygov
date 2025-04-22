import {IsString, IsNotEmpty, IsDateString} from 'class-validator';

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    title:string;

    @IsDateString()
    @IsNotEmpty()
    datetime: Date;

    @IsString()
    @IsNotEmpty()
    location:string;

    @IsString()
    @IsNotEmpty()
    photo:string;

    @IsString()
    @IsNotEmpty()
    description:string;
}