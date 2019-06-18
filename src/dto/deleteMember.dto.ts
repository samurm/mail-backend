import { IsEmail } from 'class-validator';
import { List } from './list.dto';

export class DeleteMember extends List {
    @IsEmail()
    readonly member: string;
}
