import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListController } from './list/list.controller';
import { MailController } from './mail/mail.controller';
import { MailService } from './mail/mail.service';
import { ListService } from './list/list.service';

@Module({
  imports: [],
  controllers: [AppController, ListController, MailController],
  providers: [AppService, MailService, ListService],
})
export class AppModule {}
