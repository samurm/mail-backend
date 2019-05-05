import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import * as mailgun from 'mailgun-js';

@Controller('mail')
export class MailController {

  @Post('send')
  sendMail(@Body() body, @Res() res): void {
    const key = body.key;
    const myDomain = body.domain;
    // const key = 'pubkey-2d4cc3835b7b2de07fece7dfba1d8102';
    // const DOMAIN = 'sandboxfb738172d6c04c978af0b294e45e3da6.mailgun.org';
    const mg = mailgun({apiKey: key, domain: myDomain});
    const mail = {
      from: 'me@samples.mailgun.org',
      to: 'samu97rm@gmail.com',
      subject: 'Hello',
      text: 'Testing some Mailgun awesomness!',
    };

    mg.messages().send(mail, (error, data) => {
      res.status(400).json(data);
    });
  }

  @Post('validate')
  validateMail(@Body() body, @Res() res): void {
    const key = body.key;
    const myDomain = body.domain;
    const mg = mailgun({apiKey: key, domain: myDomain});
    const mail = body.mail;

    mg.validate(mail, (err, data) => {
      if (data && data.is_valid) {
        res.status(400).send(true);
      }
      res.status(200).send(false);
    });
  }
}
