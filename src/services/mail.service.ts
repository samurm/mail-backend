import { CreateMember } from '../dto/createMember.dto';
import { CreateMembers } from '../dto/createMembers.dto';
import { UpdateMember } from '../dto/updateMember.dto';
import { DeleteMember } from '../dto/deleteMember.dto';
import { Mail } from '../dto/mail.dto';
import { MailMultiple } from '../dto/mailMultiple.dto';
import { MailValidate } from '../dto/mailValidate.dto';
import { Injectable, Body, Res, ValidationPipe } from '@nestjs/common';
import { MailGunAdapter } from '../adapters/mailgun.adapter';

@Injectable()
export class MailService {
    private mailAdapter: MailGunAdapter;

    constructor() {
        this.mailAdapter = new MailGunAdapter();
    }

    readList(@Body(new ValidationPipe()) listName: string): Promise<any> {
      return this.mailAdapter.listInfo(listName);
    }

    createMember(@Body(new ValidationPipe()) createMember: CreateMember): Promise<any> {
      return this.mailAdapter.createMember(createMember);
    }

    createMembers(@Body(new ValidationPipe()) createMembers: CreateMembers): Promise<any> {
      return this.mailAdapter.createMembers(createMembers);
    }

    listMembers(@Body(new ValidationPipe()) listName: string): Promise<any> {
      return this.mailAdapter.listMembers(listName);
    }

    updateMember(@Body(new ValidationPipe()) updateMember: UpdateMember): Promise<any> {
      return this.mailAdapter.updateMember(updateMember);
    }

    deleteMember(@Body(new ValidationPipe()) deleteMember: DeleteMember): Promise<any> {
      return this.mailAdapter.deleteMember(deleteMember);
    }

    sendIndividualMail(@Body(new ValidationPipe()) mail: Mail): Promise<any> {
      return this.mailAdapter.sendMail(mail);
    }

    sendMultipleMail(@Body(new ValidationPipe()) mailMultiple: MailMultiple): Promise<any> {
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
      return this.mailAdapter.sendMail(mailMultiple);
    }

    validateMail(@Body(new ValidationPipe()) mailValidate: MailValidate): Promise<any> {
      return this.mailAdapter.validateMail(mailValidate.mail);
    }
}
