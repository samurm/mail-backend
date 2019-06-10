
import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsString, IsNotEmpty} from 'class-validator';
import { ListName } from './list.dto';

export class CreateMember extends ListName {
    @IsString()
    readonly member: string;
}
