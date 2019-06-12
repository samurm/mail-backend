import { Catch, HttpException, Res } from '@nestjs/common';
import { HttpExceptionMail } from './email.exception';

@Catch(HttpException)
export class HttpExceptionMemberDoesnotExist extends HttpExceptionMail {

  constructor(@Res() res) {
    super(res, 'Member does not exist', 403);
  }

}
