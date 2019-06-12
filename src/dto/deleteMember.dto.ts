import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsString, IsNotEmpty, IsBoolean} from 'class-validator';
import { ListName } from './list.dto';

export class DeleteMember extends ListName {
    @IsString()
    readonly member: string;
}
