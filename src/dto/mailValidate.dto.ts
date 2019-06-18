import { IsEmail } from 'class-validator';

export class MailValidate {
    @IsEmail()
    readonly mail: string;
}
