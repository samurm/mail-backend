import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsString, IsNotEmpty, IsOptional} from 'class-validator';

export class MailValidate {
    @IsString()
    readonly mail: string;
}
