import { Controller, Get, Body, Res, Post, Put, Delete } from '@nestjs/common';
import * as mailgun from 'mailgun-js';

@Controller('list')
export class ListController {

    @Post('read')
    readList(@Body() body, @Res() res): void {
      console.log(body);
      const mg = mailgun({apiKey: process.env.KEY, domain: process.env.DOMAIN});
      const list = mg.lists(body.listName);

      list.info((err, data) => {
        res.status(400).json(data);
      });
    }

    @Post('create')
    createMember(@Body() body, @Res() res): void {
      const mg = mailgun({apiKey: process.env.KEY, domain: process.env.DOMAIN});
      const list = mg.lists(body.listName);
      const member = JSON.parse(body.member);

      list.members().create(member, (err, data) => {
        res.status(400).json(data);
      });
    }

    @Post('add')
    addMembers(@Body() body, @Res() res): void {
      const mg = mailgun({apiKey: process.env.KEY, domain: process.env.DOMAIN});
      const list = mg.lists(body.listName);
      const membersList = JSON.parse(body.members);

      list.members().add({members: membersList, subscribed: true}, (err, data) => {
        res.status(400).json(data);
      });
    }

    @Post('members')
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
