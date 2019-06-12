import { Controller, Body, Res, Post, Put, Delete, ValidationPipe } from '@nestjs/common';
import * as mailgun from 'mailgun-js';
import { ListName } from '../dto/list.dto';
import { CreateMember } from '../dto/createMember.dto';
import { CreateMembers } from '../dto/createMembers.dto';
import { UpdateMember } from '../dto/updateMember.dto';
import { DeleteMember } from '../dto/deleteMember.dto';
import { MailService } from '../services/mail.service';

@Controller('list')
export class ListController {
    constructor(private mailService: MailService) {

    }

    @Post('read')
    readList(@Body(new ValidationPipe()) listName: ListName, @Res() res): void {
      this.mailService.readList(listName, res);
    }

    @Post('member/create')
    createMember(@Body(new ValidationPipe()) createMember: CreateMember, @Res() res): void {
      this.mailService.createMember(createMember, res);
    }

    @Post('members/create')
    addMembers(@Body(new ValidationPipe()) createMembers: CreateMembers, @Res() res): void {
      this.mailService.createMembers(createMembers, res);
    }

    @Post('members')
    readMembers(@Body(new ValidationPipe()) listName: ListName, @Res() res): void {
      this.mailService.listMembers(listName, res);
    }

    @Put('members')
    updateMember(@Body(new ValidationPipe()) updateMember: UpdateMember, @Res() res): void {
      this.mailService.updateMember(updateMember, res);
    }

    @Delete('member')
    deleteMember(@Body(new ValidationPipe()) deleteMember: DeleteMember, @Res() res): void {
      this.mailService.deleteMember(deleteMember, res);
    }
}
