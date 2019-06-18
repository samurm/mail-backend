import { Controller, Body, Post, ValidationPipe } from '@nestjs/common';
import { MailService } from '../services/mail.service';
import { Mail } from '../dto/mail.dto';
import { MailMultiple } from '../dto/mailMultiple.dto';
import { MailValidate } from '../dto/mailValidate.dto';
import * as path from 'path';

@Controller('mail')
export class MailController {

  constructor(private mailService: MailService) {

  }

  @Post('send/individual')
  async sendIndividualMail(@Body(new ValidationPipe()) mail: Mail): Promise<any> {
    if (mail.attachment) {
      mail.attachment = path.join(__dirname + '/../data', mail.attachment);
    }
    return await this.mailService.sendIndividualMail(mail);
  }

  @Post('send/multiple')
  async sendMultipleMail(@Body(new ValidationPipe()) mailMultiple: MailMultiple): Promise<any> {
    if (mailMultiple.attachment) {
      mailMultiple.attachment = path.join(__dirname + '/../data', mailMultiple.attachment);
    }
    return await this.mailService.sendMultipleMail(mailMultiple);
  }

  @Post('validate')
  async validateMail(@Body(new ValidationPipe()) mailValidate: MailValidate): Promise<any> {
    return await this.mailService.validateMail(mailValidate);
  }

}
