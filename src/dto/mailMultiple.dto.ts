import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsString, IsNotEmpty, IsOptional, IsArray} from 'class-validator';
import { Mail } from './mail.dto';

export class MailMultiple extends Mail {
    @IsArray()
    @IsOptional()
    readonly bcc: string[];

    @IsArray()
    @IsOptional()
    readonly cc: string[];
}
