import { Controller, Body, Res, Post, Put, Delete, ValidationPipe } from '@nestjs/common';
import * as mailgun from 'mailgun-js';
import * as path from 'path';
import { MailService } from '../services/mail.service';
import { Mail } from '../dto/mail.dto';
import { MailMultiple } from '../dto/mailMultiple.dto';
import { MailValidate } from '../dto/mailValidate.dto';

@Controller('mail')
export class MailController {

  constructor(private mailService: MailService) {

  }

  @Post('send/individual')
  sendIndividualMail(@Body(new ValidationPipe()) mail: Mail, @Res() res): void {
    this.mailService.sendIndividualMail(mail, res);
  }

  @Post('send/multiple')
  sendMultipleMail(@Body(new ValidationPipe()) mailMultiple: MailMultiple, @Res() res): void {
    this.mailService.sendMultipleMail(mailMultiple, res);
  }

  @Post('send/path')
  sendMailPath(@Body() body, @Res() res): void {
    const mg = mailgun({apiKey: process.env.KEY, domain: process.env.DOMAIN});
    const filepath = path.join(__dirname, 'mailgun_logo.png');
    const mail = {
      from: 'Excited User <me@samples.mailgun.org>',
      to: 'samu97rm@gmail.com',
      subject: 'Hello',
      text: 'Testing some Mailgun awesomeness!',
      attachment: filepath,
      // html: parseHtml(nombreTemplate, variables);
    };

    mg.messages().send(mail, (error, data) => {
      res.status(400).json(data);
    });
  }

  @Post('validate')
  validateMail(@Body(new ValidationPipe()) mailValidate: MailValidate, @Res() res): void {
    this.mailService.validateMail(mailValidate, res);
  }
}
