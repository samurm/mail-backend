import { IsEmail, IsString, ValidateNested, IsOptional, IsJSON } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import * as path from 'path';

export class Mail {
    @IsEmail()
    readonly from: string;

    @IsEmail()
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
    @ValidateNested()
    @Expose({ name: 'recipient-variables' })
    readonly recipientVariables: object;

    @IsOptional()
    @IsJSON()
    @Expose({ name: 'h:X-Mailgun-Variables' })
    templateVariables: string;

    @IsOptional()
    @Transform((attachment: string) => path.join(__dirname + '/../data', attachment), {toPlainOnly: true})
    attachment: string;
}
