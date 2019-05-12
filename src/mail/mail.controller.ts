import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import * as mailgun from 'mailgun-js';
import * as path from 'path';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {

  constructor(private mailService: MailService) {

  }
  @Post('send')
  sendMail(@Body() body, @Res() res): void {
    const mg = mailgun({apiKey: process.env.KEY, domain: process.env.DOMAIN});
    const mail = {
      from: 'me@samples.mailgun.org',
      to: body.mails,
      subject: 'Hello',
      text: 'Testing some Mailgun awesomness!',
    };

    this.mailService.hola();

    mg.messages().send(mail, (error, data) => {
      res.status(400).json(data);
    });
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
      html: parseHtml(nombreTemplate, variables);
    };

    mg.messages().send(mail, (error, data) => {
      res.status(400).json(data);
    });
  }

  @Post('validate')
  validateMail(@Body() body, @Res() res): void {
    const mg = mailgun({apiKey: process.env.PUB_KEY, domain: process.env.DOMAIN});
    const mail = body.mail;

    mg.validate(mail, (err, data) => {
      if (data && data.is_valid) {
        res.status(400).send(true);
      } else {
        res.status(200).send(false);
      }
    });
  }
}
