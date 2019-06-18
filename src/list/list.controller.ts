import { Controller, Body, Res, Post, Put, Delete, ValidationPipe } from '@nestjs/common';
import { List } from '../dto/list.dto';
import { CreateMember } from '../dto/createMember.dto';
import { CreateMembers } from '../dto/createMembers.dto';
import { UpdateMember } from '../dto/updateMember.dto';
import { DeleteMember } from '../dto/deleteMember.dto';
import { MailService } from '../services/mail.service';
import { HttpExceptionListNameNotFound } from 'src/exceptions/listNameNotFound.exception';
import { HttpExceptionMemberIsCreated } from 'src/exceptions/memberIsCreated.exception';
import { HttpExceptionMemberDoesnotExist } from '../exceptions/memberDoesnotExist.exception';

@Controller('list')
export class ListController {
    constructor(private mailService: MailService) {

    }

    @Post('read')
    async readList(@Body(new ValidationPipe()) { listName }: List): Promise<any> {
      try {
        return await this.mailService.readList(listName);
      } catch {
        throw new HttpExceptionListNameNotFound(listName);
      }
    }

    @Post('member/create')
    async createMember(@Body(new ValidationPipe()) createMember: CreateMember): Promise<any> {
      try {
        return await this.mailService.createMember(createMember);
      } catch {
        throw new HttpExceptionMemberIsCreated(createMember.member.address);
      }
    }

    @Post('members/create')
    async addMembers(@Body(new ValidationPipe()) createMembers: CreateMembers): Promise<any> {
        return await this.mailService.createMembers(createMembers);
    }

    @Post('members')
    async readMembers(@Body(new ValidationPipe()) { listName }: List): Promise<any> {
      try {
        return await this.mailService.listMembers(listName);
      } catch {
        throw new HttpExceptionListNameNotFound(listName);
      }
    }

    @Put('members')
    async updateMember(@Body(new ValidationPipe()) updateMember: UpdateMember): Promise<any> {
      try {
        return await this.mailService.updateMember(updateMember);
      } catch {
        throw new HttpExceptionMemberDoesnotExist(updateMember.member);
      }
    }

    @Delete('member')
    async deleteMember(@Body(new ValidationPipe()) deleteMember: DeleteMember): Promise<any> {
      try {
        return await this.mailService.deleteMember(deleteMember);
      } catch {
        throw new HttpExceptionMemberDoesnotExist(deleteMember.member);
      }
    }
}
