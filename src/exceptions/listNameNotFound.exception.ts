import { Catch, HttpException, Res, ForbiddenException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionListNameNotFound extends ForbiddenException {

  constructor(listName: string) {
    super('ListName incorrect name:' + listName);
  }

}
