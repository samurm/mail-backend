import { ListName } from '../dto/list.dto';
import { CreateMember } from '../dto/createMember.dto';
import { CreateMembers } from '../dto/createMembers.dto';
import { UpdateMember } from '../dto/updateMember.dto';
import { DeleteMember } from '../dto/deleteMember.dto';
import { Mail } from '../dto/mail.dto';
import { MailMultiple } from '../dto/mailMultiple.dto';
import { MailValidate } from '../dto/mailValidate.dto';
import { Injectable, Controller, Body, Res, Post, Put, Delete, ValidationPipe } from '@nestjs/common';
import { MailGunAdapter } from '../adapters/mailgun.adapter';
import { HttpExceptionListNameNotFound } from '../exceptions/listNameNotFound.exception';
import { HttpExceptionMemberIsCreated } from '../exceptions/memberIsCreated.exception';
import { HttpExceptionMemberDoesnotExist } from '../exceptions/memberDoesnotExist.exception';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class MailService {
    private mailAdapter: MailGunAdapter;

    constructor() {
        this.mailAdapter = new MailGunAdapter();
    }

    readList(@Body(new ValidationPipe()) listName: string): Promise<any> {
      return this.mailAdapter.listInfo(listName);
    }

    createMember(@Body(new ValidationPipe()) createMember: CreateMember, @Res() res): void {
      const member = JSON.parse(createMember.member);

      this.mailAdapter.createMember(createMember.listName, member).then(data => {
        res.status(200).json(data);
      }).catch( () => {
        throw new HttpExceptionMemberIsCreated(res);
      });
    }

    createMembers(@Body(new ValidationPipe()) createMembers: CreateMembers, @Res() res): void {
      const members = JSON.parse(createMembers.members);

      this.mailAdapter.createMembers(createMembers.listName, members, createMembers.subscribed).then(data => {
        res.status(200).json(data);
      }).catch( (err) => {
        console.log(err);
        throw new HttpExceptionMemberIsCreated(res);
      });
    }

    listMembers(@Body(new ValidationPipe()) listName: ListName, @Res() res): void {

      this.mailAdapter.listMembers(listName.listName).then(data => {
        res.status(200).json(data);
      }).catch( () => {
        throw new HttpExceptionListNameNotFound(res);
      });
    }

    updateMember(@Body(new ValidationPipe()) updateMember: UpdateMember, @Res() res): void {
      const member = updateMember.member;
      const updateMemberData = JSON.parse(updateMember.updateMember);

      this.mailAdapter.updateMember(updateMember.listName, member, updateMemberData).then(data => {
        res.status(200).json(data);
      }).catch( () => {
        throw new HttpExceptionMemberDoesnotExist(res);
      });
    }

    deleteMember(@Body(new ValidationPipe()) deleteMember: DeleteMember, @Res() res): void {
      const member = deleteMember.member;

      this.mailAdapter.deleteMember(deleteMember.listName, member).then(data => {
        res.status(200).json(data);
      }).catch( () => {
        throw new HttpExceptionMemberDoesnotExist(res);
      });
    }

    sendIndividualMail(@Body(new ValidationPipe()) mail: Mail, @Res() res): void {
      mail.attachment = path.join(__dirname, mail.attachment);

      // mail['recipient-variables'] = mail.recipientVariables;
      // mail['h:X-Mailgun-Variables'] = mail.templateVariables;
      console.log(mail);

      this.mailAdapter.sendMail(mail).then(data => {
        res.status(200).json(data);
      }).catch( (err) => {
        console.log(err);
        throw new HttpExceptionMemberDoesnotExist(res);
      });
    }

    sendMultipleMail(@Body(new ValidationPipe()) mailMultiple: MailMultiple, @Res() res): void {
      console.log(mailMultiple);
      /*const recipientVars = {
        'email1@gmail.com': {
          id: 1,
          subject: 'Subject 1',
          name: 'Name 1',
        },
        'email2@gmail.com': {
          id: 2,
          subject: 'Subject 2',
          name: 'Name 2',
        },
      };*/

      /*const envelope = {
        from: 'Sender <sender@gmail.com>',
        to: recipients,
        subject: '%recipient.subject%',
        html: 'Hey <strong>%recipient.name%<strong>',
        'recipient-variables': recipientVars,
      };*/
      this.mailAdapter.sendMail(mailMultiple).then(data => {
        res.status(200).json(data);
      }).catch( (err) => {
        console.log(err);
        throw new HttpExceptionMemberDoesnotExist(res);
      });
    }

    validateMail(@Body(new ValidationPipe()) mailValidate: MailValidate, @Res() res): void {
      this.mailAdapter.validateMail(mailValidate.mail).then(data => {
          res.status(200).send(data);
      }).catch( (err) => {
        console.log(err);
        throw new HttpExceptionMemberDoesnotExist(res);
      });
    }
}
