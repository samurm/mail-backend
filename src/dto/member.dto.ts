import { IsOptional, IsBoolean, IsString, ValidateNested, IsEmail } from 'class-validator';

export class Member {
    @IsOptional()
    @IsBoolean()
    readonly subscribed: boolean;

    @IsEmail()
    readonly address: string;

    @IsOptional()
    @IsString()
    readonly name: string;

    @IsOptional()
    @ValidateNested()
    readonly vars: object;
}
