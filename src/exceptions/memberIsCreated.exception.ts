import { Catch, HttpException, Res } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionMemberIsCreated extends HttpException {

  constructor(member) {
    super('Member ' + member + ' already exists', 402);
  }

}
