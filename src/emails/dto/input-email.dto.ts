import {IsEmail, IsNotEmpty} from 'class-validator';

export class InputEmailDto {
    @IsEmail()
    @IsNotEmpty()
    subscriber_email:string;
}