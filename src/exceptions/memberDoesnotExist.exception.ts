import { Catch, HttpException, Res } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionMemberDoesnotExist extends HttpException {

  constructor(member) {
    super('Member ' + member + ' does not exist', 403);
  }

}
