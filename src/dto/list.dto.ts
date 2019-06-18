import { IsString, IsNumber, IsNumberString } from 'class-validator';

export class List {
    @IsString()
    readonly listName: string;
}
