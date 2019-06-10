import { Catch, HttpException, Res } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionMail extends HttpException {

  constructor(@Res() res, message: string, code: number) {
      super(message, code);
      res.status(code).json({error: message});
  }
}
