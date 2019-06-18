import { ValidateNested, IsBoolean} from 'class-validator';
import { Type } from 'class-transformer';
import { List } from './list.dto';
import { Member } from './member.dto';

export class CreateMembers extends List {
    @ValidateNested({ each: true })
    @Type(() => Member)
    readonly members: Member[];

    @IsBoolean()
    readonly subscribed: boolean;
}
