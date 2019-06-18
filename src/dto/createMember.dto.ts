import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { List } from './list.dto';
import { Member } from './member.dto';

export class CreateMember extends List {
    @ValidateNested()
    @Type(() => Member)
    readonly member: Member;
}
