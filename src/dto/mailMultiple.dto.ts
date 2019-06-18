import { IsArray, IsOptional } from 'class-validator';
import { Mail } from './mail.dto';

export class MailMultiple extends Mail {
    @IsArray()
    @IsOptional()
    readonly bcc: string[];

    @IsArray()
    @IsOptional()
    readonly cc: string[];
}
