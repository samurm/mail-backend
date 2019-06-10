
import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsString, IsNotEmpty} from 'class-validator';

export class ListName {
    @IsString()
    readonly listName: string;
}
