import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsString, IsNotEmpty, IsBoolean} from 'class-validator';
import { CreateMember } from './createMember.dto';

export class UpdateMember extends CreateMember {
    @IsString()
    readonly updateMember: string;
}
