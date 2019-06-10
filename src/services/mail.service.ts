import { ListName } from '../dto/list.dto';
import { CreateMember } from '../dto/createMember.dto';
import { Injectable, Controller, Body, Res, Post, Put, Delete, ValidationPipe } from '@nestjs/common';
import { MailGunAdapter } from '../adapters/mailgun.adapter';
import { HttpExceptionListNameNotFound } from '../exceptions/listNameNotFound.exception';

@Injectable()
export class MailService {
    private mailAdapter: MailGunAdapter;

    constructor() {
        this.mailAdapter = new MailGunAdapter();
    }

    readList(@Body(new ValidationPipe()) listName: ListName, @Res() res) {
        const listInfo = this.mailAdapter.listInfo(listName.listName);

        listInfo.then(data => {
          res.status(200).json(data);
        }).catch( () => {
          throw new HttpExceptionListNameNotFound(res);
        });
    }

    createMember(@Body(new ValidationPipe()) createMember: CreateMember, @Res() res): void {
      const list = this.mailAdapter.list(createMember.listName);
      const member = JSON.parse(createMember.member);

      this.mailAdapter.createMember(list, member).then(data => {
        res.status(200).json(data);
      }).catch( (err) => {
        console.log(err);
        throw new HttpExceptionListNameNotFound(res);
      });
    }
}
