import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsString, IsNotEmpty, IsOptional, IsArray} from 'class-validator';
import { Expose } from 'class-transformer';
import * as path from 'path';

export class Mail {
    @IsString()
    readonly from: string;

    @IsString()
    readonly to: string;

    @IsString()
    readonly subject: string;

    @IsString()
    @IsOptional()
    readonly text: string;

    @IsString()
    @IsOptional()
    readonly html: string;

    @IsString()
    @IsOptional()
    readonly template: string;

    @IsOptional()
    @Expose({ name: 'recipient-variables' })
    readonly recipientVariables: object;

    @IsOptional()
    @Expose({ name: 'h:X-Mailgun-Variables' })
    templateVariables: string;

    @IsOptional()
    attachment: any;
}
