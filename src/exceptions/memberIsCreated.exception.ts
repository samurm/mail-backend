import { Catch, HttpException, Res } from '@nestjs/common';
import { HttpExceptionMail } from './email.exception';

@Catch(HttpException)
export class HttpExceptionMemberIsCreated extends HttpExceptionMail {

  constructor(@Res() res) {
    super(res, 'Member already exists', 402);
  }

}
