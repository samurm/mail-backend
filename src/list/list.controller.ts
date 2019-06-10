import { Controller, Body, Res, Post, Put, Delete, ValidationPipe } from '@nestjs/common';
import * as mailgun from 'mailgun-js';
import { ListName } from '../dto/list.dto';
import { CreateMember } from '../dto/createMember.dto';
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

    @Post('member/list')
    addMembers(@Body() body, @Res() res): void {
      const mg = mailgun({apiKey: process.env.KEY, domain: process.env.DOMAIN});
      const list = mg.lists(body.listName);
      const membersList = JSON.parse(body.members);

      list.members().add({members: membersList, subscribed: true}, (err, data) => {
        res.status(400).json(data);
      });
    }

    @Post('member/read')
    readMembers(@Body() body, @Res() res): void {
      const mg = mailgun({apiKey: process.env.KEY, domain: process.env.DOMAIN});
      const list = mg.lists(body.listName);

      list.members().list( (err, members) => {
        res.status(400).json(members);
      });
    }

    @Put('member')
    updateMember(@Body() body, @Res() res): void {
      const mg = mailgun({apiKey: process.env.KEY, domain: process.env.DOMAIN});
      const list = mg.lists(body.listName);
      const member = body.member;
      const newData = JSON.parse(body.data);

      list.members(member).update(newData, (err, data) => {
        res.status(400).json(data);
      });
    }

    @Delete('member')
    deleteMember(@Body() body, @Res() res): void {
      const mg = mailgun({apiKey: process.env.KEY, domain: process.env.DOMAIN});
      const list = mg.lists(body.listName);
      const member = body.member;

      list.members(member).delete((err, data) => {
        res.status(400).json(data);
      });
    }
}
