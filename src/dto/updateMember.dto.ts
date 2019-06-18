import { ValidateNested, IsEmail } from 'class-validator';
import { List } from './list.dto';

export class UpdateMember extends List {
    @IsEmail()
    readonly member: string;

    @ValidateNested()
    readonly updateMember: object;
}
