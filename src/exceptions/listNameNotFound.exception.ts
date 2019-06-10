import { Catch, HttpException, Res } from '@nestjs/common';
import { HttpExceptionMail } from './email.exception';

@Catch(HttpException)
export class HttpExceptionListNameNotFound extends HttpExceptionMail {

  constructor(@Res() res) {
    super(res, 'ListName incorrect name', 401);
  }

}
